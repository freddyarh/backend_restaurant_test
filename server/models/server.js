
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api'; 

        this.connectDB();
        this.middlewares(); 
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }
    
    middlewares(){
        this.app.use( cors() );
        this.app.use(bodyParser.urlencoded({ extended: false }));

        this.app.use( express.json() );

        this.app.use( express.static('public') );
    }
    
    routes(){
        this.app.use( this.usersPath, require('../routes/index') );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server running at', this.port );
        });
    }

}

module.exports = Server;