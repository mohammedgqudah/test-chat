import Joi from 'joi';

const createServerMessageSchema = Joi.object()
    .options({ abortEarly: false })
    .keys({
        content: Joi.string().required(),
        server_id: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required(),
        section_id: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required(),
        channel_id: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required()
    });
const createMessageSchema = Joi.object()
    .options({ abortEarly: false })
    .keys({
        content: Joi.string().required(),
        conversation_id: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required()
    });
const findMessagesSchema = Joi.object()
    .options({ abortEarly: false })
    .keys({
        link: Joi.string()
            .required()
            .regex(/^[0-9a-fA-F]{24}$/),
        sub_link: Joi.string()
            .optional()
            .regex(/^[0-9a-fA-F]{24}$/)
    });
const editMessagesSchema = Joi.object()
    .options({ abortEarly: false })
    .keys({
        message_id: Joi.string()
            .required()
            .regex(/^[0-9a-fA-F]{24}$/),
        content: Joi.string().required()
    });
export { createMessageSchema };
export { findMessagesSchema };
export { editMessagesSchema };
export { createServerMessageSchema };
