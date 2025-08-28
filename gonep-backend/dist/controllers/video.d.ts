import { Request, Response } from 'express';
export declare class VideoController {
    static getAllVideos(req: Request, res: Response): Promise<void>;
    static getAllVideosAdmin(req: Request, res: Response): Promise<void>;
    static getVideoById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getVideosByPlacement(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getFeaturedVideo(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static createVideo(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static updateVideo(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static deleteVideo(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    private static isValidVideoUrl;
}
//# sourceMappingURL=video.d.ts.map