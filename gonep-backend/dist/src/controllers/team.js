"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamController = void 0;
const database_1 = require("../config/database");
const schema_1 = require("../database/schema");
const errorHandler_1 = require("../middleware/errorHandler");
const drizzle_orm_1 = require("drizzle-orm");
const parseTeamMember = (member) => {
    return {
        ...member,
        expertise: member.expertise ? (typeof member.expertise === 'string' ? JSON.parse(member.expertise) : member.expertise) : [],
        certifications: member.certifications ? (typeof member.certifications === 'string' ? JSON.parse(member.certifications) : member.certifications) : [],
        achievements: member.achievements ? (typeof member.achievements === 'string' ? JSON.parse(member.achievements) : member.achievements) : [],
    };
};
const removeDuplicateMembers = (members) => {
    const seen = new Set();
    return members.filter(member => {
        const key = member.email || member.name;
        if (seen.has(key)) {
            return false;
        }
        seen.add(key);
        return true;
    });
};
const removeDuplicateValues = (values) => {
    const seen = new Set();
    return values.filter(value => {
        const key = value.title;
        if (seen.has(key)) {
            return false;
        }
        seen.add(key);
        return true;
    });
};
class TeamController {
}
exports.TeamController = TeamController;
_a = TeamController;
TeamController.getAllMembers = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const members = await database_1.db
        .select()
        .from(schema_1.teamMembers)
        .where((0, drizzle_orm_1.eq)(schema_1.teamMembers.isActive, true))
        .orderBy(schema_1.teamMembers.orderIndex);
    const parsedMembers = members.map(parseTeamMember);
    const uniqueMembers = removeDuplicateMembers(parsedMembers);
    res.json({
        success: true,
        data: { members: uniqueMembers }
    });
});
TeamController.getAllMembersAdmin = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const members = await database_1.db
        .select()
        .from(schema_1.teamMembers)
        .orderBy((0, drizzle_orm_1.desc)(schema_1.teamMembers.createdAt));
    const parsedMembers = members.map(parseTeamMember);
    const uniqueMembers = removeDuplicateMembers(parsedMembers);
    res.json({
        success: true,
        data: { members: uniqueMembers }
    });
});
TeamController.getMemberById = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const memberId = parseInt(id);
    if (isNaN(memberId)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid team member ID'
        });
    }
    const member = await database_1.db
        .select()
        .from(schema_1.teamMembers)
        .where((0, drizzle_orm_1.eq)(schema_1.teamMembers.id, memberId))
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
TeamController.createMember = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const memberData = req.body;
    if (memberData.email) {
        const existingMember = await database_1.db
            .select()
            .from(schema_1.teamMembers)
            .where((0, drizzle_orm_1.eq)(schema_1.teamMembers.email, memberData.email))
            .limit(1);
        if (existingMember.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'A team member with this email already exists'
            });
        }
    }
    if (memberData.name) {
        const existingMemberByName = await database_1.db
            .select()
            .from(schema_1.teamMembers)
            .where((0, drizzle_orm_1.eq)(schema_1.teamMembers.name, memberData.name))
            .limit(1);
        if (existingMemberByName.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'A team member with this name already exists'
            });
        }
    }
    await database_1.db
        .insert(schema_1.teamMembers)
        .values(memberData);
    const [newMember] = await database_1.db
        .select()
        .from(schema_1.teamMembers)
        .where((0, drizzle_orm_1.eq)(schema_1.teamMembers.email, memberData.email))
        .limit(1);
    res.status(201).json({
        success: true,
        data: parseTeamMember(newMember)
    });
});
TeamController.updateMember = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    const memberId = parseInt(id);
    if (isNaN(memberId)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid team member ID'
        });
    }
    const existingMember = await database_1.db
        .select()
        .from(schema_1.teamMembers)
        .where((0, drizzle_orm_1.eq)(schema_1.teamMembers.id, memberId))
        .limit(1);
    if (!existingMember.length) {
        return res.status(404).json({
            success: false,
            message: 'Team member not found'
        });
    }
    if (updateData.email && updateData.email !== existingMember[0].email) {
        const duplicateMember = await database_1.db
            .select()
            .from(schema_1.teamMembers)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.teamMembers.email, updateData.email), (0, drizzle_orm_1.ne)(schema_1.teamMembers.id, memberId)))
            .limit(1);
        if (duplicateMember.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'A team member with this email already exists'
            });
        }
    }
    await database_1.db
        .update(schema_1.teamMembers)
        .set({
        ...updateData,
        updatedAt: new Date()
    })
        .where((0, drizzle_orm_1.eq)(schema_1.teamMembers.id, memberId));
    const [updatedMember] = await database_1.db
        .select()
        .from(schema_1.teamMembers)
        .where((0, drizzle_orm_1.eq)(schema_1.teamMembers.id, memberId))
        .limit(1);
    res.json({
        success: true,
        data: parseTeamMember(updatedMember)
    });
});
TeamController.deleteMember = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const memberId = parseInt(id);
    if (isNaN(memberId)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid team member ID'
        });
    }
    const existingMember = await database_1.db
        .select()
        .from(schema_1.teamMembers)
        .where((0, drizzle_orm_1.eq)(schema_1.teamMembers.id, memberId))
        .limit(1);
    if (!existingMember.length) {
        return res.status(404).json({
            success: false,
            message: 'Team member not found'
        });
    }
    await database_1.db
        .delete(schema_1.teamMembers)
        .where((0, drizzle_orm_1.eq)(schema_1.teamMembers.id, memberId));
    res.json({
        success: true,
        message: 'Team member deleted successfully'
    });
});
TeamController.getLeadership = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const leadership = await database_1.db
        .select()
        .from(schema_1.teamMembers)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.teamMembers.isLeadership, true), (0, drizzle_orm_1.eq)(schema_1.teamMembers.isActive, true)))
        .orderBy(schema_1.teamMembers.orderIndex);
    const parsedLeadership = leadership.map(parseTeamMember);
    const uniqueLeadership = removeDuplicateMembers(parsedLeadership);
    res.json({
        success: true,
        data: { leadership: uniqueLeadership }
    });
});
TeamController.getTeamValues = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const values = await database_1.db
        .select()
        .from(schema_1.teamValues)
        .where((0, drizzle_orm_1.eq)(schema_1.teamValues.isActive, true))
        .orderBy(schema_1.teamValues.orderIndex);
    const uniqueValues = removeDuplicateValues(values);
    res.json({
        success: true,
        data: { values: uniqueValues }
    });
});
TeamController.createTeamValue = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const valueData = req.body;
    if (valueData.title) {
        const existingValue = await database_1.db
            .select()
            .from(schema_1.teamValues)
            .where((0, drizzle_orm_1.eq)(schema_1.teamValues.title, valueData.title))
            .limit(1);
        if (existingValue.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'A team value with this title already exists'
            });
        }
    }
    await database_1.db
        .insert(schema_1.teamValues)
        .values(valueData);
    const [newValue] = await database_1.db
        .select()
        .from(schema_1.teamValues)
        .where((0, drizzle_orm_1.eq)(schema_1.teamValues.title, valueData.title))
        .limit(1);
    res.status(201).json({
        success: true,
        data: newValue
    });
});
TeamController.updateTeamValue = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    const valueId = parseInt(id);
    if (isNaN(valueId)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid team value ID'
        });
    }
    await database_1.db
        .update(schema_1.teamValues)
        .set({
        ...updateData,
        updatedAt: new Date()
    })
        .where((0, drizzle_orm_1.eq)(schema_1.teamValues.id, valueId));
    const [updatedValue] = await database_1.db
        .select()
        .from(schema_1.teamValues)
        .where((0, drizzle_orm_1.eq)(schema_1.teamValues.id, valueId))
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
TeamController.deleteTeamValue = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const valueId = parseInt(id);
    if (isNaN(valueId)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid team value ID'
        });
    }
    await database_1.db
        .delete(schema_1.teamValues)
        .where((0, drizzle_orm_1.eq)(schema_1.teamValues.id, valueId));
    res.json({
        success: true,
        message: 'Team value deleted successfully'
    });
});
//# sourceMappingURL=team.js.map