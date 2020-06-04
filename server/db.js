const { Pool } = require('pg');

// Change password to the real one
const pool = new Pool({
  user: 'postgres',
  password: 'abc',
  host: 'localhost',
  port: 5432,
  database: 'todo_pern',
});

module.exports = pool;
