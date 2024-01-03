const {Router} = require('express');

const tagsRouter = Router();

const TagsControllers = require('../controllers/TagsControllers');

const ensureAuthenticated =  require("../middleware/ensureAuthenticated");

const tagsControllers = new TagsControllers;

tagsRouter.get('/', ensureAuthenticated, tagsControllers.all);

module.exports = tagsRouter;