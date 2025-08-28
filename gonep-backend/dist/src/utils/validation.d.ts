import Joi from 'joi';
export declare class ValidationUtils {
    static userRegistration: Joi.ObjectSchema<any>;
    static userLogin: Joi.ObjectSchema<any>;
    static userUpdate: Joi.ObjectSchema<any>;
    static blogPostCreate: Joi.ObjectSchema<any>;
    static blogPostUpdate: Joi.ObjectSchema<any>;
    static blogCommentCreate: Joi.ObjectSchema<any>;
    static demoRequestCreate: Joi.ObjectSchema<any>;
    static demoRequestUpdate: Joi.ObjectSchema<any>;
    static jobApplicationCreate: Joi.ObjectSchema<any>;
    static jobApplicationUpdate: Joi.ObjectSchema<any>;
    static contactInquiryCreate: Joi.ObjectSchema<any>;
    static contactInquiryUpdate: Joi.ObjectSchema<any>;
    static newsletterSubscription: Joi.ObjectSchema<any>;
    static pagination: Joi.ObjectSchema<any>;
    static fileUpload: Joi.ObjectSchema<any>;
    static analyticsEvent: Joi.ObjectSchema<any>;
    static uuid: Joi.StringSchema<string>;
    static email: Joi.StringSchema<string>;
    static password: Joi.StringSchema<string>;
    static validate<T>(schema: Joi.Schema, data: any): T;
    static validatePartial<T>(schema: Joi.Schema, data: any): Partial<T>;
    static sanitizeHtml(html: string): string;
    static validateSearchQuery(query: string): string;
}
//# sourceMappingURL=validation.d.ts.map