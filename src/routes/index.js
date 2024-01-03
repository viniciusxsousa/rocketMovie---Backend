const {Router} = require('express');

const routes = Router();

const userRouter = require('./user.routes');
const movieRouter = require('./movie.routes');
const tagsRouter = require('./tags.routes');
const sessionsRouter = require('./sessions.routes');

routes.use('/user', userRouter);
routes.use('/movie', movieRouter);
routes.use('/tags', tagsRouter);
routes.use('/sessions', sessionsRouter);

module.exports = routes