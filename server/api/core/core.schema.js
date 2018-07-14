import Joi from 'joi';
const friendRequestSchema = Joi.object()
    .options({ abortEarly: false })
    .keys({
        name_id: Joi.string()
            .required()
            .regex(/.#\d\d\d\d/)
    });
const acceptFriendRequestSchema = Joi.object().options({abortEarly:false}).keys({
    pending_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
});
export { friendRequestSchema };
export {acceptFriendRequestSchema}
