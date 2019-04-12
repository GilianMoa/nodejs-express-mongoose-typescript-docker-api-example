import config from "config";
import express from "express";
import mongoose from "mongoose";
import debug from "debug"

// middleware
import {authenticate} from "./middleware/authenticate";
import helmet from "helmet";
import morgan from "morgan";

// routers and controllers
import indexRouter from "./routes/index.router";
import coursesRouter from "./routes/courses.router";
import authorRouter from "./routes/author.router";
import userRouter from "./routes/users.router";


/**
 * Set debugger with namespace "app"
 */
const appDebug = debug('app:ts');
const dbDebug = debug('app:db');

/**
 * Create Express server
 */
const app = express();


/**
 * Connect to database
 */
mongoose.connect(`${config.get('mongodbUrl')}/testDB`, {useNewUrlParser: true})
    .then(() => {
        dbDebug('Connected to mongoDB')
    })
    .catch(err => {
        dbDebug('Could not connect to mongodb...', err)
    });

/**
 * Testing debugger and environment config
 */
appDebug(`App is started in: ${config.get('env')} mode`);

/**
 * Set render engine and views path
 */
app.set('view engine', 'pug');
app.set('views', config.get('viewsPath'));

/**
 * Middleware
 */
app.use(express.json()); // req.body
app.use(authenticate);
app.use(helmet());
app.use(morgan('tiny'));

/**
 * App routes.
 */
app.use('/', indexRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/authors', authorRouter);
app.use('/api/users', userRouter);

export default app;
