import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { SECRET } from '../development';
const hashPassword = password => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
};
const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};
const token = (payload, expiresIn) => {
    return jwt.sign(payload, SECRET, {
        expiresIn
    });
};
export { hashPassword };
export { token };
export { comparePassword };
