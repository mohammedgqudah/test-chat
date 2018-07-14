import express from 'express';
const app = express.Router();
import auth from './auth/auth.router';
import core from './core/core.router';

app.use('/auth', auth);
app.use('/core', core)
export default app;
