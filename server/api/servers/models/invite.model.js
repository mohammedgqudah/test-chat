import mongoose from 'mongoose';

const InviteSchema = new mongoose.Schema({
    createdAt: { type: Date, expires: 60, default: Date.now},
    server: String,
    token: String
});
const Invite = mongoose.model('Invite', InviteSchema);

export default Invite;
