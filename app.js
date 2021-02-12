import express from 'express';
import cookieParser from 'cookie-parser';
// ADD these
import userRoutes from './src/routes/user.js';
import authRoutes from './src/routes/auth.js';
import logger from 'morgan';
import config from './src/config/env.js';
import mongoose from "mongoose";



// set up DB connection
const URI = config.mongoURI;
mongoose
    .connect(
        URI,
        {useNewUrlParser: true}
    )
    //
    .then(() => console.log("MongoDB successfully connected"))
    // error
    .catch(err => console.log(err));


var app = express();

// middleware functions
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// set up routes
app.use('/', userRoutes);
app.use('/', authRoutes);

// unauthorisation error
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: err.name + ':' + err.message });
    }
});


app.listen(config.port, () => {
    console.log(`🚀 at port ${config.port}`);
});
