"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CareersController = void 0;
const database_1 = require("../config/database");
const schema_1 = require("../database/schema");
const errorHandler_1 = require("../middleware/errorHandler");
const drizzle_orm_1 = require("drizzle-orm");
class CareersController {
}
exports.CareersController = CareersController;
_a = CareersController;
CareersController.getAllJobs = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { page = 1, limit = 10, department } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    let whereClause = (0, drizzle_orm_1.eq)(schema_1.jobOpenings.isActive, true);
    if (department) {
        whereClause = (0, drizzle_orm_1.and)(whereClause, (0, drizzle_orm_1.eq)(schema_1.jobOpenings.departmentId, Number(department)));
    }
    const jobs = await database_1.db
        .select({
        id: schema_1.jobOpenings.id,
        title: schema_1.jobOpenings.title,
        slug: schema_1.jobOpenings.slug,
        departmentId: schema_1.jobOpenings.departmentId,
        location: schema_1.jobOpenings.location,
        type: schema_1.jobOpenings.type,
        level: schema_1.jobOpenings.level,
        description: schema_1.jobOpenings.description,
        requirements: schema_1.jobOpenings.requirements,
        responsibilities: schema_1.jobOpenings.responsibilities,
        benefits: schema_1.jobOpenings.benefits,
        niceToHave: schema_1.jobOpenings.niceToHave,
        salaryRange: schema_1.jobOpenings.salaryRange,
        experience: schema_1.jobOpenings.experience,
        education: schema_1.jobOpenings.education,
        teamInfo: schema_1.jobOpenings.teamInfo,
        growthOpportunities: schema_1.jobOpenings.growthOpportunities,
        isActive: schema_1.jobOpenings.isActive,
        isFeatured: schema_1.jobOpenings.isFeatured,
        applicationDeadline: schema_1.jobOpenings.applicationDeadline,
        createdAt: schema_1.jobOpenings.createdAt,
        updatedAt: schema_1.jobOpenings.updatedAt,
        department: {
            id: schema_1.departments.id,
            name: schema_1.departments.name,
            description: schema_1.departments.description
        }
    })
        .from(schema_1.jobOpenings)
        .leftJoin(schema_1.departments, (0, drizzle_orm_1.eq)(schema_1.jobOpenings.departmentId, schema_1.departments.id))
        .where(whereClause)
        .orderBy((0, drizzle_orm_1.desc)(schema_1.jobOpenings.createdAt))
        .limit(Number(limit))
        .offset(offset);
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
CareersController.getAllJobsAdmin = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { page = 1, limit = 50, department } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    let whereClause = undefined;
    if (department) {
        whereClause = (0, drizzle_orm_1.eq)(schema_1.jobOpenings.departmentId, Number(department));
    }
    const jobs = await database_1.db
        .select({
        id: schema_1.jobOpenings.id,
        title: schema_1.jobOpenings.title,
        slug: schema_1.jobOpenings.slug,
        departmentId: schema_1.jobOpenings.departmentId,
        location: schema_1.jobOpenings.location,
        type: schema_1.jobOpenings.type,
        level: schema_1.jobOpenings.level,
        description: schema_1.jobOpenings.description,
        requirements: schema_1.jobOpenings.requirements,
        responsibilities: schema_1.jobOpenings.responsibilities,
        benefits: schema_1.jobOpenings.benefits,
        niceToHave: schema_1.jobOpenings.niceToHave,
        salaryRange: schema_1.jobOpenings.salaryRange,
        experience: schema_1.jobOpenings.experience,
        education: schema_1.jobOpenings.education,
        teamInfo: schema_1.jobOpenings.teamInfo,
        growthOpportunities: schema_1.jobOpenings.growthOpportunities,
        isActive: schema_1.jobOpenings.isActive,
        isFeatured: schema_1.jobOpenings.isFeatured,
        applicationDeadline: schema_1.jobOpenings.applicationDeadline,
        createdAt: schema_1.jobOpenings.createdAt,
        updatedAt: schema_1.jobOpenings.updatedAt,
        department: {
            id: schema_1.departments.id,
            name: schema_1.departments.name,
            description: schema_1.departments.description
        }
    })
        .from(schema_1.jobOpenings)
        .leftJoin(schema_1.departments, (0, drizzle_orm_1.eq)(schema_1.jobOpenings.departmentId, schema_1.departments.id))
        .where(whereClause)
        .orderBy((0, drizzle_orm_1.desc)(schema_1.jobOpenings.createdAt))
        .limit(Number(limit))
        .offset(offset);
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
CareersController.getJobBySlug = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { slug } = req.params;
    const job = await database_1.db
        .select({
        id: schema_1.jobOpenings.id,
        title: schema_1.jobOpenings.title,
        slug: schema_1.jobOpenings.slug,
        departmentId: schema_1.jobOpenings.departmentId,
        location: schema_1.jobOpenings.location,
        type: schema_1.jobOpenings.type,
        level: schema_1.jobOpenings.level,
        description: schema_1.jobOpenings.description,
        requirements: schema_1.jobOpenings.requirements,
        responsibilities: schema_1.jobOpenings.responsibilities,
        benefits: schema_1.jobOpenings.benefits,
        niceToHave: schema_1.jobOpenings.niceToHave,
        salaryRange: schema_1.jobOpenings.salaryRange,
        experience: schema_1.jobOpenings.experience,
        education: schema_1.jobOpenings.education,
        teamInfo: schema_1.jobOpenings.teamInfo,
        growthOpportunities: schema_1.jobOpenings.growthOpportunities,
        isActive: schema_1.jobOpenings.isActive,
        isFeatured: schema_1.jobOpenings.isFeatured,
        applicationDeadline: schema_1.jobOpenings.applicationDeadline,
        createdAt: schema_1.jobOpenings.createdAt,
        updatedAt: schema_1.jobOpenings.updatedAt,
        department: {
            id: schema_1.departments.id,
            name: schema_1.departments.name,
            description: schema_1.departments.description
        }
    })
        .from(schema_1.jobOpenings)
        .leftJoin(schema_1.departments, (0, drizzle_orm_1.eq)(schema_1.jobOpenings.departmentId, schema_1.departments.id))
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.jobOpenings.slug, slug || ''), (0, drizzle_orm_1.eq)(schema_1.jobOpenings.isActive, true)))
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
CareersController.getDepartments = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    try {
        const deptsWithCounts = await database_1.db
            .select({
            id: schema_1.departments.id,
            name: schema_1.departments.name,
            description: schema_1.departments.description,
            isActive: schema_1.departments.isActive,
            createdAt: schema_1.departments.createdAt,
            updatedAt: schema_1.departments.updatedAt,
            jobCount: (0, drizzle_orm_1.sql) `COUNT(${schema_1.jobOpenings.id})`
        })
            .from(schema_1.departments)
            .leftJoin(schema_1.jobOpenings, (0, drizzle_orm_1.eq)(schema_1.departments.id, schema_1.jobOpenings.departmentId))
            .where((0, drizzle_orm_1.eq)(schema_1.departments.isActive, true))
            .groupBy(schema_1.departments.id, schema_1.departments.name, schema_1.departments.description, schema_1.departments.isActive, schema_1.departments.createdAt, schema_1.departments.updatedAt)
            .orderBy(schema_1.departments.name);
        const departmentsWithCounts = deptsWithCounts.map(dept => ({
            ...dept,
            jobCount: Number(dept.jobCount)
        }));
        res.json({
            success: true,
            data: { departments: departmentsWithCounts }
        });
    }
    catch (error) {
        console.error('Error fetching departments:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch departments',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});
CareersController.getDepartmentStats = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    try {
        const deptStats = await database_1.db
            .select({
            id: schema_1.departments.id,
            name: schema_1.departments.name,
            description: schema_1.departments.description,
            isActive: schema_1.departments.isActive,
            totalJobs: (0, drizzle_orm_1.sql) `COUNT(${schema_1.jobOpenings.id})`,
            activeJobs: (0, drizzle_orm_1.sql) `COUNT(CASE WHEN ${schema_1.jobOpenings.isActive} = true THEN 1 END)`,
            inactiveJobs: (0, drizzle_orm_1.sql) `COUNT(CASE WHEN ${schema_1.jobOpenings.isActive} = false THEN 1 END)`,
            featuredJobs: (0, drizzle_orm_1.sql) `COUNT(CASE WHEN ${schema_1.jobOpenings.isFeatured} = true THEN 1 END)`,
            createdAt: schema_1.departments.createdAt,
            updatedAt: schema_1.departments.updatedAt
        })
            .from(schema_1.departments)
            .leftJoin(schema_1.jobOpenings, (0, drizzle_orm_1.eq)(schema_1.departments.id, schema_1.jobOpenings.departmentId))
            .where((0, drizzle_orm_1.eq)(schema_1.departments.isActive, true))
            .groupBy(schema_1.departments.id, schema_1.departments.name, schema_1.departments.description, schema_1.departments.isActive, schema_1.departments.createdAt, schema_1.departments.updatedAt)
            .orderBy(schema_1.departments.name);
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
    }
    catch (error) {
        console.error('Error fetching department stats:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch department statistics',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});
CareersController.createDepartment = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { name, description } = req.body;
    if (!name || !name.trim()) {
        return res.status(400).json({
            success: false,
            message: 'Department name is required'
        });
    }
    const existingDept = await database_1.db
        .select()
        .from(schema_1.departments)
        .where((0, drizzle_orm_1.eq)(schema_1.departments.name, name.trim()))
        .limit(1);
    if (existingDept.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Department with this name already exists'
        });
    }
    const [newDept] = await database_1.db
        .insert(schema_1.departments)
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
CareersController.updateDepartment = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    if (!name || !name.trim()) {
        return res.status(400).json({
            success: false,
            message: 'Department name is required'
        });
    }
    const existingDept = await database_1.db
        .select()
        .from(schema_1.departments)
        .where((0, drizzle_orm_1.eq)(schema_1.departments.id, Number(id)))
        .limit(1);
    if (existingDept.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'Department not found'
        });
    }
    const duplicateName = await database_1.db
        .select()
        .from(schema_1.departments)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.departments.name, name.trim()), (0, drizzle_orm_1.ne)(schema_1.departments.id, Number(id))))
        .limit(1);
    if (duplicateName.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Department with this name already exists'
        });
    }
    await database_1.db
        .update(schema_1.departments)
        .set({
        name: name.trim(),
        description: description?.trim() || '',
        updatedAt: new Date()
    })
        .where((0, drizzle_orm_1.eq)(schema_1.departments.id, Number(id)));
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
CareersController.deleteDepartment = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const existingDept = await database_1.db
        .select()
        .from(schema_1.departments)
        .where((0, drizzle_orm_1.eq)(schema_1.departments.id, Number(id)))
        .limit(1);
    if (existingDept.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'Department not found'
        });
    }
    const jobsWithDept = await database_1.db
        .select()
        .from(schema_1.jobOpenings)
        .where((0, drizzle_orm_1.eq)(schema_1.jobOpenings.departmentId, Number(id)))
        .limit(1);
    if (jobsWithDept.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Cannot delete department that has job openings. Please reassign or delete the jobs first.'
        });
    }
    await database_1.db
        .update(schema_1.departments)
        .set({
        isActive: false,
        updatedAt: new Date()
    })
        .where((0, drizzle_orm_1.eq)(schema_1.departments.id, Number(id)));
    res.json({
        success: true,
        message: 'Department deleted successfully'
    });
});
CareersController.createJob = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { title, slug, departmentId, location, type, level, description, requirements, responsibilities, benefits, niceToHave, salaryRange, experience, education, teamInfo, growthOpportunities, isActive, isFeatured, applicationDeadline } = req.body;
    if (!title || !departmentId || !description) {
        return res.status(400).json({
            success: false,
            message: 'Title, department, and description are required'
        });
    }
    try {
        const dept = await database_1.db
            .select()
            .from(schema_1.departments)
            .where((0, drizzle_orm_1.eq)(schema_1.departments.id, Number(departmentId)))
            .limit(1);
        if (dept.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Department not found'
            });
        }
        const finalSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const processArrayField = (field) => {
            if (Array.isArray(field)) {
                return field
                    .filter(item => item && typeof item === 'string' && item.trim() !== '')
                    .map(item => item.trim());
            }
            if (typeof field === 'string') {
                try {
                    const parsed = JSON.parse(field);
                    if (Array.isArray(parsed)) {
                        return parsed
                            .filter(item => item && typeof item === 'string' && item.trim() !== '')
                            .map(item => item.trim());
                    }
                }
                catch {
                }
                return field
                    .split('\n')
                    .filter(item => item && item.trim() !== '')
                    .map(item => item.trim());
            }
            return [];
        };
        const processDateField = (dateValue) => {
            if (!dateValue)
                return null;
            if (dateValue instanceof Date)
                return dateValue;
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
        const [newJob] = await database_1.db
            .insert(schema_1.jobOpenings)
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
    }
    catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create job. Please try again.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});
CareersController.updateJob = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const { title, slug, departmentId, location, type, level, description, requirements, responsibilities, benefits, niceToHave, salaryRange, experience, education, teamInfo, growthOpportunities, isActive, isFeatured, applicationDeadline } = req.body;
    console.log('Update job request:', { id, title, requirements, responsibilities, benefits, niceToHave });
    if (!title || !departmentId || !description) {
        return res.status(400).json({
            success: false,
            message: 'Title, department, and description are required'
        });
    }
    try {
        const existingJob = await database_1.db
            .select()
            .from(schema_1.jobOpenings)
            .where((0, drizzle_orm_1.eq)(schema_1.jobOpenings.id, Number(id)))
            .limit(1);
        if (existingJob.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Job not found'
            });
        }
        const dept = await database_1.db
            .select()
            .from(schema_1.departments)
            .where((0, drizzle_orm_1.eq)(schema_1.departments.id, Number(departmentId)))
            .limit(1);
        if (dept.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Department not found'
            });
        }
        const processArrayField = (field) => {
            if (Array.isArray(field)) {
                return field
                    .filter(item => item && typeof item === 'string' && item.trim() !== '')
                    .map(item => item.trim());
            }
            if (typeof field === 'string') {
                try {
                    const parsed = JSON.parse(field);
                    if (Array.isArray(parsed)) {
                        return parsed
                            .filter(item => item && typeof item === 'string' && item.trim() !== '')
                            .map(item => item.trim());
                    }
                }
                catch {
                }
                return field
                    .split('\n')
                    .filter(item => item && item.trim() !== '')
                    .map(item => item.trim());
            }
            return [];
        };
        const processDateField = (dateValue) => {
            if (!dateValue)
                return null;
            if (dateValue instanceof Date)
                return dateValue;
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
        await database_1.db
            .update(schema_1.jobOpenings)
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
            .where((0, drizzle_orm_1.eq)(schema_1.jobOpenings.id, Number(id)));
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
    }
    catch (error) {
        console.error('Error updating job:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update job. Please try again.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});
CareersController.deleteJob = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const existingJob = await database_1.db
        .select()
        .from(schema_1.jobOpenings)
        .where((0, drizzle_orm_1.eq)(schema_1.jobOpenings.id, Number(id)))
        .limit(1);
    if (existingJob.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'Job not found'
        });
    }
    await database_1.db
        .update(schema_1.jobOpenings)
        .set({
        isActive: false,
        updatedAt: new Date()
    })
        .where((0, drizzle_orm_1.eq)(schema_1.jobOpenings.id, Number(id)));
    res.json({
        success: true,
        message: 'Job deleted successfully'
    });
});
CareersController.submitApplication = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { jobId, firstName, lastName, email, phone, resumeUrl, coverLetter, experienceYears, currentCompany, currentPosition, expectedSalary } = req.body;
    if (!jobId || !firstName || !lastName || !email) {
        return res.status(400).json({
            success: false,
            message: 'Missing required fields'
        });
    }
    const job = await database_1.db
        .select()
        .from(schema_1.jobOpenings)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.jobOpenings.id, Number(jobId)), (0, drizzle_orm_1.eq)(schema_1.jobOpenings.isActive, true)))
        .limit(1);
    if (!job.length) {
        return res.status(404).json({
            success: false,
            message: 'Job opening not found or inactive'
        });
    }
    const [application] = await database_1.db
        .insert(schema_1.jobApplications)
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
//# sourceMappingURL=careers.js.map