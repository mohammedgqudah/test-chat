import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    // link can be conversation_id or server(_channel)_id
    link: String,
    sub_link: String,
    content: String,
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
    is_edited: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
const Message = mongoose.model('Message', MessageSchema)
export default Message;