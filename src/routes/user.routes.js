const {Router} = require("express");
const multer = require('multer');
const uploadConfig = require('../configs/upload');

const userRouter = Router();
const upload = multer(uploadConfig.MULTER);

const UserControllers = require('../controllers/UserControllers');
const UserAvatarControllers = require('../controllers/UserAvatarControllers');

const ensureAuthenticated = require('../middleware/ensureAuthenticated');

const userControllers = new UserControllers();
const userAvatarControllers = new UserAvatarControllers();

userRouter.post('/', userControllers.create);
userRouter.put('/', ensureAuthenticated, userControllers.update);
userRouter.patch('/avatar', ensureAuthenticated, upload.single("avatar"), userAvatarControllers.update);

module.exports = userRouter