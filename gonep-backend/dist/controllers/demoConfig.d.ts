import { Request, Response } from 'express';
export declare const getInterests: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getDemoTypes: (req: Request, res: Response) => Promise<void>;
export declare const getAvailableDates: (req: Request, res: Response) => Promise<void>;
export declare const checkDateAvailability: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const addInterest: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateInterest: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteInterest: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const addDemoType: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateDemoType: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteDemoType: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const setCalendarAvailability: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getCalendarAvailabilityRange: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=demoConfig.d.ts.map