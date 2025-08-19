import { Request, Response } from 'express';
import { db } from '../config/database';
import { jobOpenings, departments, jobApplications } from '../database/schema';
import { asyncHandler } from '../middleware/errorHandler';
import { eq, desc, and, sql, ne } from 'drizzle-orm';

export class CareersController {
  // Get all job openings with department information (public - only active)
  static getAllJobs = asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, limit = 10, department } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let whereClause: any = eq(jobOpenings.isActive, true);
    if (department) {
      whereClause = and(whereClause, eq(jobOpenings.departmentId, Number(department)));
    }

    const jobs = await db
      .select({
        id: jobOpenings.id,
        title: jobOpenings.title,
        slug: jobOpenings.slug,
        departmentId: jobOpenings.departmentId,
        location: jobOpenings.location,
        type: jobOpenings.type,
        level: jobOpenings.level,
        description: jobOpenings.description,
        requirements: jobOpenings.requirements,
        responsibilities: jobOpenings.responsibilities,
        benefits: jobOpenings.benefits,
        niceToHave: jobOpenings.niceToHave,
        salaryRange: jobOpenings.salaryRange,
        experience: jobOpenings.experience,
        education: jobOpenings.education,
        teamInfo: jobOpenings.teamInfo,
        growthOpportunities: jobOpenings.growthOpportunities,
        isActive: jobOpenings.isActive,
        isFeatured: jobOpenings.isFeatured,
        applicationDeadline: jobOpenings.applicationDeadline,
        createdAt: jobOpenings.createdAt,
        updatedAt: jobOpenings.updatedAt,
        department: {
          id: departments.id,
          name: departments.name,
          description: departments.description
        }
      })
      .from(jobOpenings)
      .leftJoin(departments, eq(jobOpenings.departmentId, departments.id))
      .where(whereClause)
      .orderBy(desc(jobOpenings.createdAt))
      .limit(Number(limit))
      .offset(offset);

    // Debug: Log the first job to see the data structure
    if (jobs.length > 0 && jobs[0]) {
      const job = jobs[0];
      console.log('Sample job from database (public):', {
        id: job.id,
        title: job.title,
        requirementsType: typeof job.requirements,
        requirementsValue: job.requirements,
        responsibilitiesType: typeof job.responsibilities,
        responsibilitiesValue: job.responsibilities,
        benefitsType: typeof job.benefits,
        benefitsValue: job.benefits
      });
    }

    res.json({
      success: true,
      data: { jobs }
    });
  });

  // Get all job openings for admin (including inactive)
  static getAllJobsAdmin = asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, limit = 50, department } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let whereClause: any = undefined;
    if (department) {
      whereClause = eq(jobOpenings.departmentId, Number(department));
    }

    const jobs = await db
      .select({
        id: jobOpenings.id,
        title: jobOpenings.title,
        slug: jobOpenings.slug,
        departmentId: jobOpenings.departmentId,
        location: jobOpenings.location,
        type: jobOpenings.type,
        level: jobOpenings.level,
        description: jobOpenings.description,
        requirements: jobOpenings.requirements,
        responsibilities: jobOpenings.responsibilities,
        benefits: jobOpenings.benefits,
        niceToHave: jobOpenings.niceToHave,
        salaryRange: jobOpenings.salaryRange,
        experience: jobOpenings.experience,
        education: jobOpenings.education,
        teamInfo: jobOpenings.teamInfo,
        growthOpportunities: jobOpenings.growthOpportunities,
        isActive: jobOpenings.isActive,
        isFeatured: jobOpenings.isFeatured,
        applicationDeadline: jobOpenings.applicationDeadline,
        createdAt: jobOpenings.createdAt,
        updatedAt: jobOpenings.updatedAt,
        department: {
          id: departments.id,
          name: departments.name,
          description: departments.description
        }
      })
      .from(jobOpenings)
      .leftJoin(departments, eq(jobOpenings.departmentId, departments.id))
      .where(whereClause)
      .orderBy(desc(jobOpenings.createdAt))
      .limit(Number(limit))
      .offset(offset);

    // Debug: Log the first job to see the data structure
    if (jobs.length > 0 && jobs[0]) {
      const job = jobs[0];
      console.log('Sample job from database (admin):', {
        id: job.id,
        title: job.title,
        requirementsType: typeof job.requirements,
        requirementsValue: job.requirements,
        responsibilitiesType: typeof job.responsibilities,
        responsibilitiesValue: job.responsibilities,
        benefitsType: typeof job.benefits,
        benefitsValue: job.benefits
      });
    }

    res.json({
      success: true,
      data: { jobs }
    });
  });

  // Get job by slug with department information
  static getJobBySlug = asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;

    const job = await db
      .select({
        id: jobOpenings.id,
        title: jobOpenings.title,
        slug: jobOpenings.slug,
        departmentId: jobOpenings.departmentId,
        location: jobOpenings.location,
        type: jobOpenings.type,
        level: jobOpenings.level,
        description: jobOpenings.description,
        requirements: jobOpenings.requirements,
        responsibilities: jobOpenings.responsibilities,
        benefits: jobOpenings.benefits,
        niceToHave: jobOpenings.niceToHave,
        salaryRange: jobOpenings.salaryRange,
        experience: jobOpenings.experience,
        education: jobOpenings.education,
        teamInfo: jobOpenings.teamInfo,
        growthOpportunities: jobOpenings.growthOpportunities,
        isActive: jobOpenings.isActive,
        isFeatured: jobOpenings.isFeatured,
        applicationDeadline: jobOpenings.applicationDeadline,
        createdAt: jobOpenings.createdAt,
        updatedAt: jobOpenings.updatedAt,
        department: {
          id: departments.id,
          name: departments.name,
          description: departments.description
        }
      })
      .from(jobOpenings)
      .leftJoin(departments, eq(jobOpenings.departmentId, departments.id))
      .where(and(
        eq(jobOpenings.slug, slug || ''),
        eq(jobOpenings.isActive, true)
      ))
      .limit(1);

    if (!job.length) {
      return res.status(404).json({
        success: false,
        message: 'Job opening not found'
      });
    }

    res.json({
      success: true,
      data: { job: job[0] }
    });
  });

  // Get departments
  static getDepartments = asyncHandler(async (req: Request, res: Response) => {
    try {
      // Get departments with job counts using a join
      const deptsWithCounts = await db
        .select({
          id: departments.id,
          name: departments.name,
          description: departments.description,
          isActive: departments.isActive,
          createdAt: departments.createdAt,
          updatedAt: departments.updatedAt,
          jobCount: sql<number>`COUNT(${jobOpenings.id})`
        })
        .from(departments)
        .leftJoin(jobOpenings, eq(departments.id, jobOpenings.departmentId))
        .where(eq(departments.isActive, true))
        .groupBy(departments.id, departments.name, departments.description, departments.isActive, departments.createdAt, departments.updatedAt)
        .orderBy(departments.name);

      // Convert BigInt to number for jobCount
      const departmentsWithCounts = deptsWithCounts.map(dept => ({
        ...dept,
        jobCount: Number(dept.jobCount)
      }));

      res.json({
        success: true,
        data: { departments: departmentsWithCounts }
      });
    } catch (error) {
      console.error('Error fetching departments:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch departments',
        error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      });
    }
  });

  // Get department statistics for admin dashboard
  static getDepartmentStats = asyncHandler(async (req: Request, res: Response) => {
    try {
      // Get departments with detailed job statistics
      const deptStats = await db
        .select({
          id: departments.id,
          name: departments.name,
          description: departments.description,
          isActive: departments.isActive,
          totalJobs: sql<number>`COUNT(${jobOpenings.id})`,
          activeJobs: sql<number>`COUNT(CASE WHEN ${jobOpenings.isActive} = true THEN 1 END)`,
          inactiveJobs: sql<number>`COUNT(CASE WHEN ${jobOpenings.isActive} = false THEN 1 END)`,
          featuredJobs: sql<number>`COUNT(CASE WHEN ${jobOpenings.isFeatured} = true THEN 1 END)`,
          createdAt: departments.createdAt,
          updatedAt: departments.updatedAt
        })
        .from(departments)
        .leftJoin(jobOpenings, eq(departments.id, jobOpenings.departmentId))
        .where(eq(departments.isActive, true))
        .groupBy(departments.id, departments.name, departments.description, departments.isActive, departments.createdAt, departments.updatedAt)
        .orderBy(departments.name);

      // Convert BigInt to numbers
      const departmentStats = deptStats.map(dept => ({
        ...dept,
        totalJobs: Number(dept.totalJobs),
        activeJobs: Number(dept.activeJobs),
        inactiveJobs: Number(dept.inactiveJobs),
        featuredJobs: Number(dept.featuredJobs)
      }));

      res.json({
        success: true,
        data: { departments: departmentStats }
      });
    } catch (error) {
      console.error('Error fetching department stats:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch department statistics',
        error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      });
    }
  });

  // Create department
  static createDepartment = asyncHandler(async (req: Request, res: Response) => {
    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Department name is required'
      });
    }

    // Check if department already exists
    const existingDept = await db
      .select()
      .from(departments)
      .where(eq(departments.name, name.trim()))
      .limit(1);

    if (existingDept.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Department with this name already exists'
      });
    }

    // Create new department
    const [newDept] = await db
      .insert(departments)
      .values({
        name: name.trim(),
        description: description?.trim() || '',
        isActive: true
      });

    res.status(201).json({
      success: true,
      message: 'Department created successfully',
      data: {
        id: newDept.insertId,
        name: name.trim(),
        description: description?.trim() || '',
        isActive: true
      }
    });
  });

  // Update department
  static updateDepartment = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Department name is required'
      });
    }

    // Check if department exists
    const existingDept = await db
      .select()
      .from(departments)
      .where(eq(departments.id, Number(id)))
      .limit(1);

    if (existingDept.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }

    // Check if name already exists (excluding current department)
    const duplicateName = await db
      .select()
      .from(departments)
      .where(and(
        eq(departments.name, name.trim()),
        ne(departments.id, Number(id))
      ))
      .limit(1);

    if (duplicateName.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Department with this name already exists'
      });
    }

    // Update department
    await db
      .update(departments)
      .set({
        name: name.trim(),
        description: description?.trim() || '',
        updatedAt: new Date()
      })
      .where(eq(departments.id, Number(id)));

    res.json({
      success: true,
      message: 'Department updated successfully',
      data: {
        id: Number(id),
        name: name.trim(),
        description: description?.trim() || '',
        isActive: true
      }
    });
  });

  // Delete department
  static deleteDepartment = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    // Check if department exists
    const existingDept = await db
      .select()
      .from(departments)
      .where(eq(departments.id, Number(id)))
      .limit(1);

    if (existingDept.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }

    // Check if department has jobs
    const jobsWithDept = await db
      .select()
      .from(jobOpenings)
      .where(eq(jobOpenings.departmentId, Number(id)))
      .limit(1);

    if (jobsWithDept.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete department that has job openings. Please reassign or delete the jobs first.'
      });
    }

    // Soft delete by setting isActive to false
    await db
      .update(departments)
      .set({
        isActive: false,
        updatedAt: new Date()
      })
      .where(eq(departments.id, Number(id)));

    res.json({
      success: true,
      message: 'Department deleted successfully'
    });
  });

  // Create job
  static createJob = asyncHandler(async (req: Request, res: Response) => {
    const {
      title,
      slug,
      departmentId,
      location,
      type,
      level,
      description,
      requirements,
      responsibilities,
      benefits,
      niceToHave,
      salaryRange,
      experience,
      education,
      teamInfo,
      growthOpportunities,
      isActive,
      isFeatured,
      applicationDeadline
    } = req.body;

    if (!title || !departmentId || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title, department, and description are required'
      });
    }

    try {
      // Check if department exists
      const dept = await db
        .select()
        .from(departments)
        .where(eq(departments.id, Number(departmentId)))
        .limit(1);

      if (dept.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Department not found'
        });
      }

      // Use provided slug or create from title
      const finalSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      // Process JSON fields - ensure they are arrays and filter out empty strings
      const processArrayField = (field: any): string[] => {
        if (Array.isArray(field)) {
          return field
            .filter(item => item && typeof item === 'string' && item.trim() !== '')
            .map(item => item.trim());
        }
        if (typeof field === 'string') {
          // Handle case where the string might be a JSON string
          try {
            const parsed = JSON.parse(field);
            if (Array.isArray(parsed)) {
              return parsed
                .filter(item => item && typeof item === 'string' && item.trim() !== '')
                .map(item => item.trim());
            }
          } catch {
            // If parsing fails, treat as regular string
          }
          return field
            .split('\n')
            .filter(item => item && item.trim() !== '')
            .map(item => item.trim());
        }
        return [];
      };

      // Process date field
      const processDateField = (dateValue: any): Date | null => {
        if (!dateValue) return null;
        if (dateValue instanceof Date) return dateValue;
        if (typeof dateValue === 'string') {
          const date = new Date(dateValue);
          return isNaN(date.getTime()) ? null : date;
        }
        return null;
      };

      const processedRequirements = processArrayField(requirements);
      const processedResponsibilities = processArrayField(responsibilities);
      const processedBenefits = processArrayField(benefits);
      const processedNiceToHave = processArrayField(niceToHave);
      const processedApplicationDeadline = processDateField(applicationDeadline);

      // Create new job
      const [newJob] = await db
        .insert(jobOpenings)
        .values({
          title: title.trim(),
          slug: finalSlug,
          departmentId: Number(departmentId),
          location: location || '',
          type: type || 'Full-time',
          level: level || 'Mid-level',
          description: description.trim(),
          requirements: processedRequirements,
          responsibilities: processedResponsibilities,
          benefits: processedBenefits,
          niceToHave: processedNiceToHave,
          salaryRange: salaryRange || '',
          experience: experience || '',
          education: education || '',
          teamInfo: teamInfo || '',
          growthOpportunities: growthOpportunities || '',
          isActive: isActive !== undefined ? isActive : true,
          isFeatured: isFeatured !== undefined ? isFeatured : false,
          applicationDeadline: processedApplicationDeadline || null
        });

      res.status(201).json({
        success: true,
        message: 'Job created successfully',
        data: {
          id: newJob.insertId,
          title: title.trim(),
          slug: finalSlug,
          departmentId: Number(departmentId),
          location: location || '',
          type: type || 'Full-time',
          level: level || 'Mid-level',
          description: description.trim(),
          requirements: processedRequirements,
          responsibilities: processedResponsibilities,
          benefits: processedBenefits,
          niceToHave: processedNiceToHave,
          salaryRange: salaryRange || '',
          experience: experience || '',
          education: education || '',
          teamInfo: teamInfo || '',
          growthOpportunities: growthOpportunities || '',
          isActive: isActive !== undefined ? isActive : true,
          isFeatured: isFeatured !== undefined ? isFeatured : false,
          applicationDeadline: processedApplicationDeadline || null
        }
      });
    } catch (error) {
      console.error('Error creating job:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create job. Please try again.',
        error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      });
    }
  });

  // Update job
  static updateJob = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
      title,
      slug,
      departmentId,
      location,
      type,
      level,
      description,
      requirements,
      responsibilities,
      benefits,
      niceToHave,
      salaryRange,
      experience,
      education,
      teamInfo,
      growthOpportunities,
      isActive,
      isFeatured,
      applicationDeadline
    } = req.body;

    console.log('Update job request:', { id, title, requirements, responsibilities, benefits, niceToHave });

    if (!title || !departmentId || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title, department, and description are required'
      });
    }

    try {
      // Check if job exists
      const existingJob = await db
        .select()
        .from(jobOpenings)
        .where(eq(jobOpenings.id, Number(id)))
        .limit(1);

      if (existingJob.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Job not found'
        });
      }

      // Check if department exists
      const dept = await db
        .select()
        .from(departments)
        .where(eq(departments.id, Number(departmentId)))
        .limit(1);

      if (dept.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Department not found'
        });
      }

      // Process JSON fields - ensure they are arrays and filter out empty strings
      const processArrayField = (field: any): string[] => {
        if (Array.isArray(field)) {
          return field
            .filter(item => item && typeof item === 'string' && item.trim() !== '')
            .map(item => item.trim());
        }
        if (typeof field === 'string') {
          // Handle case where the string might be a JSON string
          try {
            const parsed = JSON.parse(field);
            if (Array.isArray(parsed)) {
              return parsed
                .filter(item => item && typeof item === 'string' && item.trim() !== '')
                .map(item => item.trim());
            }
          } catch {
            // If parsing fails, treat as regular string
          }
          return field
            .split('\n')
            .filter(item => item && item.trim() !== '')
            .map(item => item.trim());
        }
        return [];
      };

      // Process date field
      const processDateField = (dateValue: any): Date | null => {
        if (!dateValue) return null;
        if (dateValue instanceof Date) return dateValue;
        if (typeof dateValue === 'string') {
          const date = new Date(dateValue);
          return isNaN(date.getTime()) ? null : date;
        }
        return null;
      };

      const processedRequirements = processArrayField(requirements);
      const processedResponsibilities = processArrayField(responsibilities);
      const processedBenefits = processArrayField(benefits);
      const processedNiceToHave = processArrayField(niceToHave);
      const processedApplicationDeadline = processDateField(applicationDeadline);

      console.log('Processed fields:', {
        requirements: processedRequirements,
        responsibilities: processedResponsibilities,
        benefits: processedBenefits,
        niceToHave: processedNiceToHave
      });

      // Update job
      await db
        .update(jobOpenings)
        .set({
          title: title.trim(),
          slug: slug || existingJob[0]?.slug || '',
          departmentId: Number(departmentId),
          location: location || '',
          type: type || 'Full-time',
          level: level || existingJob[0]?.level || 'Mid-level',
          description: description.trim(),
          requirements: processedRequirements,
          responsibilities: processedResponsibilities,
          benefits: processedBenefits,
          niceToHave: processedNiceToHave,
          salaryRange: salaryRange || '',
          experience: experience || '',
          education: education || '',
          teamInfo: teamInfo || '',
          growthOpportunities: growthOpportunities || '',
          isActive: isActive !== undefined ? isActive : true,
          isFeatured: isFeatured !== undefined ? isFeatured : false,
          applicationDeadline: processedApplicationDeadline || null,
          updatedAt: new Date()
        })
        .where(eq(jobOpenings.id, Number(id)));

      console.log('Job updated successfully in database');

      const responseData = {
        id: Number(id),
        title: title.trim(),
        slug: slug || existingJob[0]?.slug || '',
        departmentId: Number(departmentId),
        location: location || '',
        type: type || 'Full-time',
        level: level || existingJob[0]?.level || 'Mid-level',
        description: description.trim(),
        requirements: processedRequirements,
        responsibilities: processedResponsibilities,
        benefits: processedBenefits,
        niceToHave: processedNiceToHave,
        salaryRange: salaryRange || '',
        experience: experience || '',
        education: education || '',
        teamInfo: teamInfo || '',
        growthOpportunities: growthOpportunities || '',
        isActive: isActive !== undefined ? isActive : true,
        isFeatured: isFeatured !== undefined ? isFeatured : false,
        applicationDeadline: processedApplicationDeadline || null
      };

      console.log('Sending response:', responseData);

      res.json({
        success: true,
        message: 'Job updated successfully',
        data: responseData
      });
    } catch (error) {
      console.error('Error updating job:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update job. Please try again.',
        error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      });
    }
  });

  // Delete job
  static deleteJob = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    // Check if job exists
    const existingJob = await db
      .select()
      .from(jobOpenings)
      .where(eq(jobOpenings.id, Number(id)))
      .limit(1);

    if (existingJob.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Soft delete by setting isActive to false
    await db
      .update(jobOpenings)
      .set({
        isActive: false,
        updatedAt: new Date()
      })
      .where(eq(jobOpenings.id, Number(id)));

    res.json({
      success: true,
      message: 'Job deleted successfully'
    });
  });

  // Submit job application
  static submitApplication = asyncHandler(async (req: Request, res: Response) => {
    const {
      jobId,
      firstName,
      lastName,
      email,
      phone,
      resumeUrl,
      coverLetter,
      experienceYears,
      currentCompany,
      currentPosition,
      expectedSalary
    } = req.body;

    // Validate required fields
    if (!jobId || !firstName || !lastName || !email) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Check if job exists and is active
    const job = await db
      .select()
      .from(jobOpenings)
      .where(and(
        eq(jobOpenings.id, Number(jobId)),
        eq(jobOpenings.isActive, true)
      ))
      .limit(1);

    if (!job.length) {
      return res.status(404).json({
        success: false,
        message: 'Job opening not found or inactive'
      });
    }

    // Create job application
    const [application] = await db
      .insert(jobApplications)
      .values({
        jobId: Number(jobId),
        firstName,
        lastName,
        email,
        phone: phone || null,
        resumeUrl: resumeUrl || null,
        coverLetter: coverLetter || null,
        experienceYears: experienceYears ? Number(experienceYears) : null,
        currentCompany: currentCompany || null,
        currentPosition: currentPosition || null,
        expectedSalary: expectedSalary || null,
        status: 'pending'
      });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: { applicationId: application.insertId }
    });
  });
}
