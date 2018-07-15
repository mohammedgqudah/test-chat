import Joi from 'joi';

const createServerSchema = Joi.object()
    .options({ abortEarly: false })
    .keys({
        name: Joi.string().required()
    });
const createInviteLinkSchema = Joi.object()
    .options({ abortEarly: false })
    .keys({
        server_id: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required(),
        will_expire: Joi.boolean().required()
    });
const createSectionSchema = Joi.object()
    .options({ abortEarly: false })
    .keys({
        server_id: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required(),
        name: Joi.string().required()
    });
const createChannelSchema = Joi.object()
    .options({ abortEarly: false })
    .keys({
        server_id: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required(),
        section_id: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required(),
        name: Joi.string().required()
    });
export { createServerSchema };
export { createInviteLinkSchema };
export { createSectionSchema };
export { createChannelSchema };
