import Passport from 'passport';
import PassportJWT from 'passport-jwt';
import { SECRET } from '../api/development';
import User from '../api/auth/models/user.model';
import { userExclude } from '../api/_helpers';
const configJWTStrategy = () => {
    let options = {
        jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: SECRET,
        secretOrPrivateKey: SECRET
    };
    Passport.use(
        new PassportJWT.Strategy(options, ({ id }, done) => {
            User.findOne({ _id: id }).then(
                user => {
                    if (user) {
                        return done(null, { ...user._doc});
                    } else {
                        return done(null, false);
                    }
                },
                err => {
                    return done(err);
                }
            );
        })
    );
};
export { configJWTStrategy };
