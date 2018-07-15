import { SECRET } from '../development';
import jwt from 'jsonwebtoken';

const createInviteLinkToken = () => {
    let text = '';
    const possible = "_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
};

const verifyInviteLinkToken = (token, cb) => {
    jwt.verify(token, SECRET, function(err, decoded) {
        if (err) return cb(err);
        cb(null, decoded);
    });
}
export { createInviteLinkToken };
export {verifyInviteLinkToken};