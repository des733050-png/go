import { Request, Response } from 'express';
export declare class CareersController {
    static getAllJobs: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getAllJobsAdmin: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getJobBySlug: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getDepartments: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getDepartmentStats: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static createDepartment: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static updateDepartment: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static deleteDepartment: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static createJob: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static updateJob: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static deleteJob: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static submitApplication: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=careers.d.ts.map