const { Client } = require('pg');

const client = new Client({
  user: 'postgres',        // Default username
  password: 'your_password', // Replace with your PostgreSQL password
  host: 'localhost',       // Or your Docker service name
  port: 5432,              // Default PostgreSQL port
  database: 'postgres'     // Default system DB
});

client.connect()
  .then(() => console.log('✅ Connected to PostgreSQL!'))
  .catch(e => console.error('❌ Connection failed:', e.message))
  .finally(() => client.end());