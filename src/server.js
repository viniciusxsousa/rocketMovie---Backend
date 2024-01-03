require('express-async-errors');
require('dotenv/config');

const database = require('./database/knex');
const uploadConfig = require('./configs/upload');

const express = require('express');
const cors = require('cors');

const AppError = require('./utils/AppError');

const app = express();
app.use(cors());
const routes = require('./routes');

database();

app.use(express.json());

app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER));
app.use(routes);

app.use( (error, request, response, next) => {
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    console.log(error);

    return response.status(500).json({
        status: 'error',
        message: 'Erro interno.'
    })
})

const PORT = process.env.PORT_SERVER;

app.listen(PORT, () => console.log(`Rodando a aplicação na porta ${PORT}`));