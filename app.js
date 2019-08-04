const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const generate_uid = require('./routes/generate_uid');
const user = require('./routes/user');

const app = express();

// let reporter = function (type, ...rest) {
//     // Логика
// };

// Обработка исключений и выход из процесса
process.on('uncaughtException', function (err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    console.error(err.stack);

    // reporter("uncaughtException", (new Date).toUTCString(), err.message, err.stack);

    process.exit(1);
});

// Обработка отмены промиса
process.on('unhandledRejection', function (reason, promise) {
    console.error('unhandled rejection:', reason.message || reason);

    // reporter("uncaughtException", (new Date).toUTCString(), reason.message || reason);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/v1/user', user);
app.use('/api/v1/generate_uid', generate_uid);

module.exports = app;

// ХУЙ
