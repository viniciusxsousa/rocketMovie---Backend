const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const DiskStorage = require('../providers/DiskStorage');

class UserAvatarControllers {
    async update(req, res) {
        const user_id = req.user.id;
        const avatarFileName = req.file.filename;

        const diskStorage = new DiskStorage();

        const user = await knex('users').where({id: user_id}).first();

        if(!user) {
            throw new AppError('É necessário está logado para trocar a foto de perfil.');
        }

        if(user.avatar) {
            await diskStorage.deleteFile(avatarFileName);
        }

        const fileName = await diskStorage.saveFile(avatarFileName);
        user.avatar = fileName;

        await knex('users').update(user).where({id: user_id});

        return res.json(user);
    }
}

module.exports = UserAvatarControllers;