import { Request, Response } from 'express';
export declare class NewsletterController {
    static subscribe: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static unsubscribe: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getSubscribers: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static updateSubscriber: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static deleteSubscriber: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=newsletter.d.ts.map