import mongoose from 'mongoose';
const user = new mongoose.Schema({
    name: String,
    email: String
});
const PendingRequestSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    }
});
const userInvalidRequestsSchema = new mongoose.Schema({
    user: String,
    tags: [{ type: String }]
});
const userInvalidRequests = mongoose.model(
    'userInvalidRequests',
    userInvalidRequestsSchema
);
export default mongoose.model('PendingRequest', PendingRequestSchema);
export { userInvalidRequests };
