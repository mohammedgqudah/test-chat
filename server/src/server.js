import express from 'express';
import color from 'color';
import logger from 'morgan';
import connect from '../db';
import api from '../api/index';
import bodyParser from 'body-parser';
import passport from 'passport';
import http from 'http';
import { configJWTStrategy } from '../middleware/passport';
import hbs from 'hbs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { SECRET } from '../api/development';

connect();
const app = express();
const fileUpload = require('express-fileupload');
const server = http.Server(app);
const port = process.env.PORT || 3000;
app.set('view engine', 'hbs');
app.use('/static', express.static(path.join(__dirname, '../public')));
app.use('/app', (req, res) => {
    res.render('app.hbs');
});

app.use(logger('dev'));
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    req.io = io;
    next();
});
app.use(passport.initialize()); // req.user
configJWTStrategy();
app.use('/api', api);
app.get('/emote/64/:name', (req, res) => {
    let { name } = req.params;
    res.redirect(
        `https://abs.twimg.com/emoji/v2/svg/${name.replace('.png', '')}.svg`
    );
});
// === === SOCKET IO === === ===
const io = require('socket.io')(server);
io.use(function(socket, next) {
    if (socket.handshake.query && socket.handshake.query.token) {
        jwt.verify(socket.handshake.query.token, SECRET, function(
            err,
            decoded
        ) {
            if (err) return next(new Error('Authentication error'));
            socket.decoded = decoded;
            next();
        });
    } else {
        next(new Error('Authentication error'));
    }
});
io.on('connection', function(socket) {
    socket.on('broadcast', function({ room, data }) {
        socket.broadcast.to(room).emit(data);
    });
});
// === === SOCKET IO === === ===

app.listen(port, () => {
    console.log(`SERVER IS UP @`, port);
});
