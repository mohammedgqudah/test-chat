import express from 'express';
import color from 'color';
import logger from 'morgan';
import connect from './db';
import api from './api/index';
import bodyParser from 'body-parser';
import passport from 'passport';
import http from 'http';
import { configJWTStrategy } from './middleware/passport';
import hbs from 'hbs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { SECRET } from './api/development';

connect();
const app = express();
const fileUpload = require('express-fileupload');
const server = http.Server(app);
const port = process.env.PORT || 3000;
app.set('view engine', 'hbs');
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/app', (req, res) => {
    res.render('app.hbs');
});

app.use(logger('dev'));
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize()); // req.user
configJWTStrategy();
const io = require('socket.io')(server);
app.use((req, res, next) => {
    req.io = io;
    next();
});
app.use('/api', api);
app.get('/emote/64/:name', (req, res) => {
    let { name } = req.params;
    res.redirect(
        `https://abs.twimg.com/emoji/v2/svg/${name.replace('.png', '')}.svg`
    );
});
// === === SOCKET IO === === ===
io.on('connection', function(socket) {
    console.log(`SOCKET CONNECTION`, socket.id);
    socket.on('join', (roomName) => {
        console.log(`[${socket.id}] Socket requested room [${roomName}]`);
        socket.join(roomName);
        setTimeout(() => {
            console.log(socket.rooms);
        }, 500);
    })
});
// === === SOCKET IO === === ===
// '192.168.1.7'
server.listen(port, () => {
    console.log(`SERVER IS UP @`, port);
});
