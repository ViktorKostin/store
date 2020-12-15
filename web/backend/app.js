const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const formidableMiddleware = require('express-formidable');

const socketIO = require('socket.io')
const { chat } = require('@sockets')
const { auth } = require('@sockets/middlewares')

const app = express();

app.use(formidableMiddleware());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public', {'extensions': 'htm'}));

app.use('/products', require('./routes/products'));
app.use('/auth', require('./routes/auth'));
app.use('/', express.static('./front/build/'))

var server = require('http').createServer(app);
var io = socketIO(server, {
  cors: {
    origins: ['http://127.0.0.1', 'http://localhost'],
    methods: ['GET', 'POST']
  }
});

io.use(auth.verifyToken)
io.use(auth.isAdmin)
io.on('connection', socket => chat(socket, io));

module.exports = {app: app, server: server}