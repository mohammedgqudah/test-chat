import Joi from 'joi';
import User from './models/user.model';
import { InvalidBody, ServerError, ErrorCode } from '../errors.creator';
import { hashPassword, comparePassword, token } from './auth.service';
import color from 'color';
import { TOKEN_EXPIRY_DATE } from '../development';
import { userExclude } from '../_helpers';
import { userInvalidRequests } from '../core/models/pending-request.model';
const login = (req, res) => {
    // @id could be name or email
    let schema = Joi.object()
        .options({ abortEarly: false })
        .keys({
            id: Joi.string().required(),
            password: Joi.string().required()
        });
    let { value, error } = Joi.validate(req.body, schema);
    if (error) {
        res.send({
            ...InvalidBody,
            list: value.details
        });
    } else {
        User.findOne({
            $or: [{ email: req.body.id }, { name: req.body.id }]
        }).then(
            user => {
                if (!user) {
                    res.send({
                        next: false,
                        code: 'UserNotFound'
                    });
                } else {
                    let compared = comparePassword(
                        req.body.password,
                        user.password
                    );
                    if (compared) {
                        res.send({
                            next: true,
                            token: token({ id: user._id }, TOKEN_EXPIRY_DATE),
                            user: {
                                ...user._doc,
                                ...userExclude
                            }
                        });
                    } else {
                        res.send({ next: false, code: 'UserNotFound' });
                    }
                }
            },
            error => {
                console.log(error);
                res.send({ next: false, server: true, error });
            }
        );
    }
};
const signup = (req, res) => {
    let schema = Joi.object()
        .options({ abortEarly: false })
        .keys({
            name: Joi.string().required(),
            password: Joi.string().required(),
            email: Joi.string()
                .email()
                .required()
        });
    let { name, email, password } = req.body;
    let { error } = Joi.validate(req.body, schema);
    if (error) {
        res.send({
            ...InvalidBody,
            error: error.details
        });
    } else {
        User.create({ name, password: hashPassword(password), email })
            .then(user => {
                return userInvalidRequests
                    .create({ user: user._id, tags: [] })
                    .then(() => {
                        res.send({
                            next: true,
                            token: token({ id: user._id }, TOKEN_EXPIRY_DATE),
                            user
                        });
                    });
            })
            .catch(error => {
                if (error.name === 'ValidationError') {
                    // 90% could be duplicate error
                    res.send({
                        next: false,
                        code: 'Duplicate',
                        errors: Object.keys(error.errors)
                    });
                } else {
                    console.log('Error', error);
                    res.send({ ...ServerError, error });
                }
            });
    }
};
const authenticated = (req, res) => {
    res.send({ user: req.user });
};
export { login };
export { signup };
export { authenticated };
