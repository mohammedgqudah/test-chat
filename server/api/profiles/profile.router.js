const app = require('express').Router();
import passport from 'passport';
import { changeAvatar } from './profile.controller';

app.use(passport.authenticate('jwt', { session: false }));
app.post('/change-avatar', changeAvatar);

export default app;
