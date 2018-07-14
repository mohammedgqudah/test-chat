import mongoose from 'mongoose';
import MBUV from 'mongoose-beautiful-unique-validation';
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 3,
        max: 20,
        required: [true, 'You must provide a user name'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'You must provide a password']
    },
    email: {
        type: String,
        unique: true
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    tag: {
        type: Number,
        default: () => Math.floor(Math.random() * 9999)
    }
});
UserSchema.plugin(MBUV);
const User = mongoose.model('User', UserSchema);
export default User;

