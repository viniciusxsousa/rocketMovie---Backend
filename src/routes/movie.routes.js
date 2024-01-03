const {Router} = require('express');

const movieRouter = Router();

const MovieControllers = require('../controllers/MovieControllers');

const ensureAuthenticated = require('../middleware/ensureAuthenticated');

const movieControllers = new MovieControllers();

movieRouter.use(ensureAuthenticated);

movieRouter.post('/', movieControllers.create);
movieRouter.get('/:id', movieControllers.show);
movieRouter.get('/', movieControllers.all);
movieRouter.delete('/:id', movieControllers.delete);

module.exports = movieRouter;