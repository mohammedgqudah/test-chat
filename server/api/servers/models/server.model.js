import mongoose from 'mongoose';
import MBUV from 'mongoose-beautiful-unique-validation';

const ChannelSchema = new mongoose.Schema({
    name: String,
    allowed_roles: {
        type: Array,
        default: ['everyone']
    }
});
const SectionSchema = new mongoose.Schema({
    name: { type: String },
    channels: [ChannelSchema]
});
const ServerSchema = new mongoose.Schema({
    king: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: String,
    sections: [SectionSchema],
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});
const ChatServer = mongoose.model('ChatServer', ServerSchema);

export default ChatServer;
