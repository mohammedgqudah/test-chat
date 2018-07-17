'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _index = require('./api/index');

var _index2 = _interopRequireDefault(_index);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _passport3 = require('../middleware/passport');

var _hbs = require('hbs');

var _hbs2 = _interopRequireDefault(_hbs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _development = require('../api/development');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _db2.default)();
var app = (0, _express2.default)();
var fileUpload = require('express-fileupload');
var server = _http2.default.Server(app);
var port = process.env.PORT || 3000;
app.set('view engine', 'hbs');
app.use('/static', _express2.default.static(_path2.default.join(__dirname, '../public')));
app.use('/app', function (req, res) {
    res.render('app.hbs');
});

app.use((0, _morgan2.default)('dev'));
app.use(fileUpload());
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    req.io = io;
    next();
});
app.use(_passport2.default.initialize()); // req.user
(0, _passport3.configJWTStrategy)();
app.use('/api', _index2.default);
// === === SOCKET IO === === ===
var io = require('socket.io')(server);
io.use(function (socket, next) {
    if (socket.handshake.query && socket.handshake.query.token) {
        _jsonwebtoken2.default.verify(socket.handshake.query.token, _development.SECRET, function (err, decoded) {
            if (err) return next(new Error('Authentication error'));
            socket.decoded = decoded;
            next();
        });
    } else {
        next(new Error('Authentication error'));
    }
});
io.on('connection', function (socket) {
    socket.on('broadcast', function (_ref) {
        var room = _ref.room,
            data = _ref.data;

        socket.broadcast.to(room).emit(data);
    });
});
// === === SOCKET IO === === ===

app.listen(port, function () {
    console.log('SERVER IS UP @', port);
});