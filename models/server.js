const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server{

    constructor(){

        this.app = express();
        this.port = process.env.PORT;
        this.usarioPath = '/api/usuarios';
        this.animalPath = '/api/animales'

        this.conectarDB();
        this.middleware();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middleware(){

        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){

        this.app.use(this.usarioPath, require('../routes/user.routes'));
        this.app.use(this.animalPath, require('../routes/animal.routes'))
    }
    listen(){
        
        this.app.listen(this.port, () =>{
            console.log('Servidor ejecutandose y escuchando el puerto', this.port)
        });
    }
    
}

module.exports = Server;