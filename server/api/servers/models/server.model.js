import mongoose from 'mongoose';

const ChannelSchema = new mongoose.Schema({
    name: String,
    allowed_roles: {
        type: Array,
        default: ['everyone']
    }
});
const SectionSchema = new mongoose.Schema({
    name: { type: String, unique: false },
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
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            roles: [{ name: String }]
        }
    ],
    roles: [{ name: String, is_admin: { type: Boolean, default: false } }]
});
const ChatServer = mongoose.model('ChatServer', ServerSchema);

export default ChatServer;
