import express from 'express';
const app = express.Router();
import { login, signup, authenticated } from './auth.controller';
import passport from 'passport';
app.post('/login', login);
app.post('/signup', signup);
app.get(
    '/me',
    passport.authenticate('jwt', { session: false }),
    authenticated
);
export default app;
