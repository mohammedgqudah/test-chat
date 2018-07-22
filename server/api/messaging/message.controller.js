import Joi from 'joi';
import ChatServer from '../servers/models/server.model';
import {
    createMessageSchema,
    findMessagesSchema,
    editMessagesSchema,
    createServerMessageSchema
} from './message.schema';
import { InvalidBody, ServerError } from '../errors.creator';
import Message from './models/message.model';
import Conversation from '../core/models/conversation.model';
const createMessage = async (req, res) => {
    const schema = createMessageSchema;
    const { error } = Joi.validate(req.body, schema);
    if (error) return res.send({ ...InvalidBody, error });
    let { content, conversation_id } = req.body;
    let { _id } = req.user;
    try {
        let conversation = await Conversation.findOne({
            _id: conversation_id,
            $or: [{ user1: _id }, { user2: _id }]
        });
        if (!conversation)
            return res.send({ next: false, code: 'ConversationNotFound' });
        let message = await Message.create({
            content,
            link: conversation_id,
            user: _id
        });
        message = await Message.populate(message, {
            path: 'user',
            select: '-_id -password -__v'
        });
        res.send({
            next: true,
            message
        });
    } catch (error) {
        res.send({ next: false, code: 'ServerError', error: error });
    }
};
const createServerMessage = async (req, res) => {
    const schema = createServerMessageSchema;
    const { error } = Joi.validate(req.body, schema);
    if (error) return res.send({ ...InvalidBody, error });
    let { content, server_id, section_id, channel_id } = req.body;
    try {
        let server = await ChatServer.findOne({
            _id: server_id,
            'users.user': { $in: req.user._id }
        });
        if (!server) return res.send({ next: false, code: 'ServerNotFound' });
        let message = await Message.create({
            content,
            user: req.user._id,
            link: server_id,
            sub_link: channel_id
        });
        message = await Message.populate(message, {
            path: 'user',
            select: '-__v -password -_id'
        });
        res.send({ next: true, message });
    } catch (error) {
        res.send({ ...ServerError, error });
    }
};
const findMessages = async (req, res) => {
    const schema = findMessagesSchema;
    const { error } = Joi.validate(req.query, schema);
    if (error) return res.send({ ...InvalidBody, error });
    try {
        let messages = await Message.find(req.query).populate({
            path: 'user',
            select: '-_id -password -__v'
        });
        res.send({ next: true, messages });
    } catch (error) {
        res.send({ next: false, code: 'ServerError', error: error });
    }
};
const editMessage = async (req, res) => {
    const schema = editMessagesSchema;
    const { error } = Joi.validate(req.body, schema);
    if (error) return res.send({ ...InvalidBody, error });
    try {
        let { message_id, content } = req.body;
        let message = await Message.findOneAndUpdate(
            { _id: message_id, user: req.user._id },
            { content, is_edited: true, updatedAt: Date.now() }
        );
        if (!message) return res.send({ next: false, code: 'MessageNotFound' });
        res.send({ next: true });
    } catch (error) {
        console.log(error);
        res.send({ next: false, code: 'ServerError', error: error });
    }
};
export { createMessage };
export { findMessages };
export { editMessage };
export { createServerMessage };
