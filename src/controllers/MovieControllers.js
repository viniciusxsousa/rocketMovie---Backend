const AppError = require('../utils/AppError');
const knex = require('../database/knex');

class MovieControllers{
    async create(req, res) {
        const {title, description, rating, tags} = req.body;
        const user_id = req.user.id;

        if(!title) {
            throw new AppError('O título é obrigatório.');
        }

        if(!description) {
            throw new AppError('A descrição é obrigatória.');
        }

        if(!rating) {
            throw new AppError('A nota é obrigatória.');
        }

        const [movie_id] = await knex("movie_notes").insert({
            title,
            description,
            rating,
            user_id
        })

        const tagsInsert = tags.map( name => {
            return {
                name,
                movie_id,
                user_id
            }
        })

        await knex('movie_tags').insert(tagsInsert);

        return res.json({
            title,
            description,
            rating,
            user_id,
        })
    }

    async show(req, res) {
        const {id} = req.params;

        const movie = await knex('movie_notes').where({id}).first();
        const tags = await knex('movie_tags').where({movie_id: id}).orderBy('name');

        res.json({
            ...movie,
            tags
        });
    }

    async all(req, res) {
        const {title, tags} = req.query;
        const user_id = req.user.id;

        let movie;

        if(tags){
            const filterTags = tags.split(',').map(tag => tag.trim());

            movie = await knex('movie_tags')
            .select([
                "movie_notes.id",
                "movie_notes.title",
                "movie_notes.description",
                "movie_notes.rating",
                "movie_notes.user_id"
            ])
            .where("movie_notes.user_id", user_id)
            .whereLike("title", `%${title}%`)
            .whereIn('name', filterTags)
            .innerJoin('movie_notes', 'movie_notes.id', "movie_tags.movie_id")
            .orderBy('movie_notes.title');

        }else {
            movie = await knex('movie_notes')
            .where({user_id})
            .whereLike('title', `%${title}%`)
            .orderBy('title');
        }

        const userTags = await knex('movie_tags').where({user_id});
        const MovieWithTags = movie.map( movie => {
            const  movieTags = userTags.filter( tag => tag.movie_id === movie.id );

            return {
                ...movie,
                tags: movieTags
            }
        } )

        res.json(MovieWithTags);
    }

    async delete(req, res) {
        const { id } = req.params;

        await knex('movie_notes').where({id}).delete();

        res.json({
            message: "Filme deletado."
        })
    }
}

module.exports = MovieControllers