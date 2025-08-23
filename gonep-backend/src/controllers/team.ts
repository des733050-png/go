import { Request, Response } from 'express';
import { db } from '../config/database';
import { teamMembers, teamValues } from '../database/schema';
import { asyncHandler } from '../middleware/errorHandler';
import { eq, desc, and, ne } from 'drizzle-orm';

// Helper function to parse JSON fields from database
const parseTeamMember = (member: any) => {
  return {
    ...member,
    expertise: member.expertise ? (typeof member.expertise === 'string' ? JSON.parse(member.expertise) : member.expertise) : [],
    certifications: member.certifications ? (typeof member.certifications === 'string' ? JSON.parse(member.certifications) : member.certifications) : [],
    achievements: member.achievements ? (typeof member.achievements === 'string' ? JSON.parse(member.achievements) : member.achievements) : [],
  };
};

// Helper function to remove duplicates from team members
const removeDuplicateMembers = (members: any[]) => {
  const seen = new Set();
  return members.filter(member => {
    const key = member.email || member.name; // Use email as primary key, fallback to name
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

// Helper function to remove duplicates from team values
const removeDuplicateValues = (values: any[]) => {
  const seen = new Set();
  return values.filter(value => {
    const key = value.title; // Use title as unique key
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

export class TeamController {
  // Get all team members (public - only active)
  static getAllMembers = asyncHandler(async (req: Request, res: Response) => {
    const members = await db
      .select()
      .from(teamMembers)
      .where(eq(teamMembers.isActive, true))
      .orderBy(teamMembers.orderIndex);

    // Parse JSON fields and remove duplicates
    const parsedMembers = members.map(parseTeamMember);
    const uniqueMembers = removeDuplicateMembers(parsedMembers);

    res.json({
      success: true,
      data: { members: uniqueMembers }
    });
  });

  // Get all team members (admin - including inactive)
  static getAllMembersAdmin = asyncHandler(async (req: Request, res: Response) => {
    const members = await db
      .select()
      .from(teamMembers)
      .orderBy(desc(teamMembers.createdAt));

    // Parse JSON fields and remove duplicates
    const parsedMembers = members.map(parseTeamMember);
    const uniqueMembers = removeDuplicateMembers(parsedMembers);

    res.json({
      success: true,
      data: { members: uniqueMembers }
    });
  });

  // Get single team member
  static getMemberById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    // Validate that id is a valid number
    const memberId = parseInt(id);
    if (isNaN(memberId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid team member ID'
      });
    }
    
    const member = await db
      .select()
      .from(teamMembers)
      .where(eq(teamMembers.id, memberId))
      .limit(1);

    if (!member.length) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    res.json({
      success: true,
      data: parseTeamMember(member[0])
    });
  });

  // Create new team member
  static createMember = asyncHandler(async (req: Request, res: Response) => {
    const memberData = req.body;

    // Check for duplicate email if provided
    if (memberData.email) {
      const existingMember = await db
        .select()
        .from(teamMembers)
        .where(eq(teamMembers.email, memberData.email))
        .limit(1);

      if (existingMember.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'A team member with this email already exists'
        });
      }
    }

    // Also check for duplicate name as fallback
    if (memberData.name) {
      const existingMemberByName = await db
        .select()
        .from(teamMembers)
        .where(eq(teamMembers.name, memberData.name))
        .limit(1);

      if (existingMemberByName.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'A team member with this name already exists'
        });
      }
    }

    await db
      .insert(teamMembers)
      .values(memberData);

    // Get the inserted member by email since we don't have insertId
    const [newMember] = await db
      .select()
      .from(teamMembers)
      .where(eq(teamMembers.email, memberData.email))
      .limit(1);

    res.status(201).json({
      success: true,
      data: parseTeamMember(newMember)
    });
  });

  // Update team member
  static updateMember = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;

    // Validate that id is a valid number
    const memberId = parseInt(id);
    if (isNaN(memberId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid team member ID'
      });
    }

    // Check if member exists
    const existingMember = await db
      .select()
      .from(teamMembers)
      .where(eq(teamMembers.id, memberId))
      .limit(1);

    if (!existingMember.length) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    // Check for duplicate email if email is being updated
    if (updateData.email && updateData.email !== existingMember[0].email) {
      const duplicateMember = await db
        .select()
        .from(teamMembers)
        .where(and(
          eq(teamMembers.email, updateData.email),
          ne(teamMembers.id, memberId)
        ))
        .limit(1);

      if (duplicateMember.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'A team member with this email already exists'
        });
      }
    }

    await db
      .update(teamMembers)
      .set({
        ...updateData,
        updatedAt: new Date()
      })
      .where(eq(teamMembers.id, memberId));

    // Get the updated member
    const [updatedMember] = await db
      .select()
      .from(teamMembers)
      .where(eq(teamMembers.id, memberId))
      .limit(1);

    res.json({
      success: true,
      data: parseTeamMember(updatedMember)
    });
  });

  // Delete team member
  static deleteMember = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    // Validate that id is a valid number
    const memberId = parseInt(id);
    if (isNaN(memberId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid team member ID'
      });
    }

    // Check if member exists
    const existingMember = await db
      .select()
      .from(teamMembers)
      .where(eq(teamMembers.id, memberId))
      .limit(1);

    if (!existingMember.length) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    await db
      .delete(teamMembers)
      .where(eq(teamMembers.id, memberId));

    res.json({
      success: true,
      message: 'Team member deleted successfully'
    });
  });

  // Get leadership team
  static getLeadership = asyncHandler(async (req: Request, res: Response) => {
    const leadership = await db
      .select()
      .from(teamMembers)
      .where(and(
        eq(teamMembers.isLeadership, true),
        eq(teamMembers.isActive, true)
      ))
      .orderBy(teamMembers.orderIndex);

    // Parse JSON fields and remove duplicates
    const parsedLeadership = leadership.map(parseTeamMember);
    const uniqueLeadership = removeDuplicateMembers(parsedLeadership);

    res.json({
      success: true,
      data: { leadership: uniqueLeadership }
    });
  });

  // Get team values
  static getTeamValues = asyncHandler(async (req: Request, res: Response) => {
    const values = await db
      .select()
      .from(teamValues)
      .where(eq(teamValues.isActive, true))
      .orderBy(teamValues.orderIndex);

    // Remove duplicates
    const uniqueValues = removeDuplicateValues(values);

    res.json({
      success: true,
      data: { values: uniqueValues }
    });
  });

  // Create team value
  static createTeamValue = asyncHandler(async (req: Request, res: Response) => {
    const valueData = req.body;

    // Check for duplicate title
    if (valueData.title) {
      const existingValue = await db
        .select()
        .from(teamValues)
        .where(eq(teamValues.title, valueData.title))
        .limit(1);

      if (existingValue.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'A team value with this title already exists'
        });
      }
    }

    await db
      .insert(teamValues)
      .values(valueData);

    // Get the inserted value by title since we don't have insertId
    const [newValue] = await db
      .select()
      .from(teamValues)
      .where(eq(teamValues.title, valueData.title))
      .limit(1);

    res.status(201).json({
      success: true,
      data: newValue
    });
  });

  // Update team value
  static updateTeamValue = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;

    // Validate that id is a valid number
    const valueId = parseInt(id);
    if (isNaN(valueId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid team value ID'
      });
    }

    await db
      .update(teamValues)
      .set({
        ...updateData,
        updatedAt: new Date()
      })
      .where(eq(teamValues.id, valueId));

    // Get the updated value
    const [updatedValue] = await db
      .select()
      .from(teamValues)
      .where(eq(teamValues.id, valueId))
      .limit(1);

    if (!updatedValue) {
      return res.status(404).json({
        success: false,
        message: 'Team value not found'
      });
    }

    res.json({
      success: true,
      data: updatedValue
    });
  });

  // Delete team value
  static deleteTeamValue = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    // Validate that id is a valid number
    const valueId = parseInt(id);
    if (isNaN(valueId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid team value ID'
      });
    }

    await db
      .delete(teamValues)
      .where(eq(teamValues.id, valueId));

    res.json({
      success: true,
      message: 'Team value deleted successfully'
    });
  });
}
