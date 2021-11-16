const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const {config, statusCodes} = require('./configs');
const {ErrorHandler} = require('./errors');
const {userRouter} = require('./routes');

const app = express();

mongoose.connect(config.MONGO_CONNECT_URL)
    .then(() => {
        // eslint-disable-next-line no-console
        console.log('Mongo connected successfully');
    });

app.use(cors({origin: _configureCors}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || statusCodes.INTERNAL_SERVER_ERROR_500)
        .json({
            msg: err.message
        });
});

app.listen(config.LISTEN_CONNECTION_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`app listen ${config.LISTEN_CONNECTION_PORT}`);
});

function _configureCors(origin, callback) {
    if (config.NODE_ENV === 'dev') {
        return callback(null, true);
    }

    const whiteList = config.ALLOWED_ORIGIN.split(';');
    if (!whiteList.includes(origin)) {
        return callback(new ErrorHandler('CORS is not allowed'), false);
    }

    return callback(null, true);
}
