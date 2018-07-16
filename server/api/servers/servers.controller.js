import Joi from 'joi';
import { InvalidBody } from '../errors.creator';
import { SECRET } from '../development';

import {
    createServerSchema,
    createInviteLinkSchema,
    createSectionSchema,
    createChannelSchema
} from './servers.schema';
import ChatServer from './models/server.model';
import {
    createInviteLinkToken,
    verifyInviteLinkToken
} from './servers.service.js';
import Invite from './models/invite.model';

const createChatServer = async (req, res) => {
    const schema = createServerSchema;
    const { error } = Joi.validate(req.body, schema);
    if (error) return res.send({ ...InvalidBody, error: error.details });
    const { name } = req.body;
    const { _id } = req.user;
    try {
        let server = await ChatServer.create({
            name,
            king: _id,
            users: [_id],
            sections: [
                { name: 'text channels', channels: [{ name: 'general' }] }
            ]
        });
        server = await ChatServer.populate(server, {
            path: 'king users',
            select: '-_id -__v -password'
        });
        res.send({ next: true, server });
    } catch (error) {
        console.log(error);
        res.send({ next: false, code: 'ServerError', error });
    }
};
const createInviteLink = async (req, res) => {
    const schema = createInviteLinkSchema;
    const { error } = Joi.validate(req.body, schema);
    if (error) return res.send({ ...InvalidBody, error: error.details });
    const { will_expire, server_id } = req.body;
    const { _id } = req.user;
    try {
        let server = await ChatServer.findOne({ _id: server_id, king: _id });
        if (!server)
            return res.send({
                next: false,
                code: 'ServerNotFound',
                message: 'Wrong ID or you are not admin'
            });
        let invite = await Invite.create({
            server: server._id,
            token: createInviteLinkToken()
        });
        res.send({ next: true, token: invite.token });
    } catch (error) {
        console.log(error);
        res.send({ next: false, code: 'ServerError', error });
    }
};
const invite = async (req, res) => {
    const token = req.params.token;
    try {
        const invite = await Invite.findOne({ token });
        if (!invite) return res.send({ next: false, code: 'InvalidInvite' });
        const server = await ChatServer.findOneAndUpdate(
            { _id: invite.server, users: { $ne: req.user._id } },
            { $push: { users: req.user._id } }
        );
        if (!server) return res.send({ next: false, code: 'UserAlreadyIn' });
        res.send({ next: true });
    } catch (error) {
        console.log(error);
        res.send({ next: false, code: 'ServerError', error });
    }
};
const getChatServers = async (req, res) => {
    try {
        const servers = await ChatServer.find({
            users: { $in: [req.user._id] }
        }).populate({ path: 'king users', select: '-_id -__v -password' });
        res.send({ next: true, servers });
    } catch (error) {
        console.log(error);
        res.send({ next: false, code: 'ServerError', error });
    }
};
const createSection = async (req, res) => {
    const schema = createSectionSchema;
    const { error } = Joi.validate(req.body, schema);
    if (error) return res.send({ ...InvalidBody, error });
    const { name, server_id } = req.body;
    try {
        const server = await ChatServer.findOneAndUpdate(
            {
                _id: server_id,
                king: req.user._id,
                'sections.name': { $ne: name }
            },
            { $push: { sections: { name: name } } },
            { new: true }
        );
        if (!server) return res.send({ next: false, code: 'InvalidData' });
        res.send({ next: true, server });
    } catch (error) {
        console.log(error);
        res.send({ next: false, code: 'ServerError', error });
    }
};
const createChannel = async (req, res) => {
    const schema = createChannelSchema;
    const { error } = Joi.validate(req.body, schema);
    if (error) return res.send({ ...InvalidBody, error });
    const { name, server_id, section_id } = req.body;
    try {
        const server = await ChatServer.findOne({ _id: server_id });
        if (!server) return res.send({ next: false, code: 'ServerNotFound' });
        const section = server.sections.find(
            section => section._id == section_id
        );
        if (!section) return res.send({ next: false, code: 'SectionNotFound' });
        section.channels.push({ name });
        await server.save();
        res.send({ next: true });
    } catch (error) {
        console.log(error);
        res.send({ next: false, code: 'ServerError', error });
    }
};
export { createChatServer };
export { createInviteLink };
export { invite };
export { getChatServers };
export { createSection };
export { createChannel };
