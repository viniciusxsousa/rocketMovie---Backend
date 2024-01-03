const AppError = require('../utils/AppError');
const knex = require('../database/knex');
const { hash, compare } = require('bcryptjs');

class UserControllers{
    async create(req, res){

        const { name, email, password } = req.body;

        if(!name) {
            throw new AppError('O nome é obrigatório.');
        }

        if(!password) {
            throw new AppError('Uma senha deve ser informada.');
        }

        const userExist = await knex('users').where({email}).first();

        if(userExist) {
            throw new AppError('Usuário já existe.');
        }

        const hashPassword = await hash(password, 8);

        await knex('users').insert({
            name,
            email,
            password: hashPassword
        })

        return res.json({
            name, 
            email,
            hashPassword
        });
    }

    async update(req, res) {
        const {name, email, old_password, password} = req.body;
        const user_id = req.user.id;

        const user = await knex('users').where({id: user_id});
        
        if(!user[0]) {
            throw new AppError('Usuário não encontrado.');
        }
        
        const userWithEmail = await knex('users').where({email})

        if(userWithEmail[0] && userWithEmail[0].id != user_id) {
            throw new AppError('Este e-mail já está em uso.');
        } 

        if(password && !old_password || !password && old_password) {
            throw new AppError('Os dois campos de senha precisam ser preenchidos.')
        }
        
        if(password && old_password) {
            const checkPassword = await compare(old_password, user[0].password);

            if(!checkPassword) {
                throw new AppError('A senhas não coferem');
            }

            user[0].password = await hash(password, 8);
        }

        user[0].name = name ?? user[0].name;
        user[0].email = email ?? user[0].email;
        user[0].updated_at = knex.fn.now();

        await knex('users').where({id: user_id}).update(user[0]);

        return res.json(userWithEmail);
    }
}

module.exports = UserControllers