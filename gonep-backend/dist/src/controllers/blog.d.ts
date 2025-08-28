import { Request, Response } from 'express';
export declare class BlogController {
    static getPosts: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getPostBySlug: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getCategories: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getCategoriesForAdmin: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static createCategory: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getAuthors: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static createAuthor: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getFeaturedPosts: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static createPost: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static updatePost: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static deletePost: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static incrementViewCount: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getComments: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static addComment: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static approveComment: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static deleteComment: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static updateCategory: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static deleteCategory: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static updateAuthor: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static deleteAuthor: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=blog.d.ts.map