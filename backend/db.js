const { Pool } = require('pg');

// Create a PostgreSQL connection pool
const db = new Pool({
    user: 'eightkeh',
    host: 'dpg-cjnnfevjbvhs73fblg6g-a.singapore-postgres.render.com',
    database: 'eightkeh',
    password: 'jaiwAfX5DAbpzBz6FMuN0BsyS1RG62r2',
    port: '5432',
    ssl: {
        rejectUnauthorized: false, 
    },
});

module.exports = db;
