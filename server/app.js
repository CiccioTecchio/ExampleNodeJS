let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let upload = require('express-fileupload');
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/usersCNT');
let fileStorageRouter = require('./routes/fileStorageCNT');
let observerRouter = require('../server/routes/observer');

let app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(upload());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/file', fileStorageRouter);
app.use('/observer', observerRouter);

let server = app.listen(3000, "127.0.0.1", function () {
    let address = server.address().address;
    let port = server.address().port;
    console.log("Listening on "+address+":"+port);
});

module.exports = app;
