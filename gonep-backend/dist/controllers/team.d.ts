import { Request, Response } from 'express';
export declare class TeamController {
    static getAllMembers: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getAllMembersAdmin: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getMemberById: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static createMember: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static updateMember: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static deleteMember: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getLeadership: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getTeamValues: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static createTeamValue: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static updateTeamValue: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static deleteTeamValue: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=team.d.ts.map