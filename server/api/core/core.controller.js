import Joi from 'joi';
import { InvalidBody } from '../errors.creator';
import Conversation from './models/conversation.model';
import PendingRequest, {
    userInvalidRequests
} from './models/pending-request.model';
import User from '../auth/models/user.model';
import { userExclude } from '../_helpers';
import { friendRequestSchema, acceptFriendRequestSchema } from './core.schema';
let invalidFriendRequestMessage =
    'Hmm, something is wrong, double check the name';
const friendRequest = async (req, res) => {
    const auser = req.user;
    const auser_name_id = `${auser.name}#${auser.tag}`;
    const { _id } = auser;
    const schema = friendRequestSchema;
    const { error } = Joi.validate(req.body, schema);
    if (error) return res.send({ ...InvalidBody, error: error.details });
    const { name_id } = req.body;
    const name_id_split = name_id.split('#');
    const username = name_id_split[0];
    const usertag = name_id_split[1];

    console.log('REQUEST USER ID', _id);

    try {
        let invalidRequests = await userInvalidRequests.findOne({ user: _id });

        console.log('TAGS', invalidRequests.tags);
        // @invalid request
        if (
            invalidRequests.tags.includes(name_id) ||
            auser_name_id == name_id
        ) {
            return res.send({
                next: false,
                code: 'InvalidRequest',
                message: invalidFriendRequestMessage
            });
        }
        let user = await User.findOne({ name: username, tag: usertag });
        // @user not found
        if (!user) {
            console.log('USER NOT FOUND');
            return res.send({
                next: false,
                code: 'InvalidRequest',
                message: invalidFriendRequestMessage
            });
        }

        console.log('OTHER USER ID', user._id);

        let pending = await PendingRequest.create({
            from: auser._id,
            to: user._id
        });
        pending = await PendingRequest.populate(pending, 'from to');
        pending = {
            ...pending._doc,
            from: {
                ...pending.from._doc,
                ...userExclude
            },
            to: {
                ...pending.to._doc,
                ...userExclude
            }
        };
        await userInvalidRequests.update(
            { user: _id },
            { $push: { tags: name_id } }
        );
        await userInvalidRequests.update(
            { user: user._id },
            { $push: { tags: auser_name_id } }
        );
        res.send({
            next: true,
            pending
        });
    } catch (err) {
        console.log(err);
        res.send({ next: false, code: 'ServerError', error: err });
    }
};
const acceptFriendRequest = async (req, res) => {
    const schema = acceptFriendRequestSchema;
    let { error } = Joi.validate(req.body, schema);
    if (error) return res.send({ ...InvalidBody, error: error.details });
    const { pending_id } = req.body;
    try {
        // @find and remove the pending request object
        let pending = await PendingRequest.findOneAndRemove({
            _id: pending_id,
            to: req.user._id
        });
        // if the object don't exist
        if (!pending) return res.send({ next: false, code: 'ObjectNotFound' });
        // create a new conversation - values are from the pending request object
        let conversation = await Conversation.create({
            user1: pending.from,
            user2: pending.to
        });
        // @populate the conversation
        conversation = await Conversation.populate(conversation, 'user1 user2');
        // @remove sensitive from the object
        conversation = {
            ...conversation._doc,
            user1: {
                ...conversation.user1._doc,
                ...userExclude
            },
            user2: {
                ...conversation.user2._doc,
                ...userExclude
            }
        };
        // @send the conversation
        res.send({
            next: true,
            conversation
        });
    } catch (error) {
        res.send({ next: false, code: 'ServerError', error: error });
    }
};
const removeFriendRequest = async (req, res) => {
    const schema = acceptFriendRequestSchema;
    let { error } = Joi.validate(req.body, schema);
    if (error) return res.send({ ...InvalidBody, error: error.details });
    const { pending_id } = req.body;
    try {
        // @find and remove the pending request object
        let pending = await PendingRequest.findOneAndRemove({
            _id: pending_id,
            $or: [{ to: req.user._id }, { from: req.user._id }]
        });
        // if the object don't exist
        if (!pending) return res.send({ next: false, code: 'ObjectNotFound' });
        res.send({ next: true });
    } catch (error) {
        res.send({ next: false, code: 'ServerError', error: error });
    }
};
const pendingRequests = async (req, res) => {
    const { _id } = req.user;
    const pending_requests = await PendingRequest.find({
        $or: [{ from: _id }, { to: _id }]
    }).populate({path: 'from to', select: '-_id -password -__v '})
    res.send({
        next: true,
        pending_requests
    });
};
const conversations = async (req, res) => {
    const { _id } = req.user;
    let conversations_list = await Conversation.find({
        $or: [{ user1: _id }, { user2: _id }]
    }).populate({path: 'user1 user2', select: '-_id -password -__v '})
    res.send({
        next: true,
        conversations: conversations_list
    });
};
export { friendRequest };
export { acceptFriendRequest };
export { removeFriendRequest };
export { pendingRequests };
export { conversations };
