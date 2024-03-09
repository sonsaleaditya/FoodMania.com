let pg = require('pg');

    const db = new pg.Client({
        host: 'localhost',
        user: 'postgres',
        password: 'adit',
        database: 'recipes',
        port: 5432
    });
    module.exports=db;