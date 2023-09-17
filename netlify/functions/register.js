// Import necessary libraries
const bcrypt = require('bcrypt');
const mysql = require('mysql');

// Configure your database connection (replace with your PlanetScale config)
const dbConfig = {
  host: 'aws.connect.psdb.cloud',       // Your PlanetScale database host
  user: '3w9lke9ua0wg8wj2mc1r',   // Your PlanetScale database username
  password: 'main-2023-09-12-41ym2o', // Your PlanetScale database password
  database: 'courses-stuff',              // Your PlanetScale database name
};

// Create a MySQL connection pool
const dbPool = mysql.createPool(dbConfig);

// Function to handle database queries
const queryDatabase = (query, values) => {
  return new Promise((resolve, reject) => {
    dbPool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }
      connection.query(query, values, (error, results) => {
        connection.release();
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  });
};

// Example usage of the queryDatabase function
const exampleQuery = 'SELECT * FROM users';
queryDatabase(exampleQuery)
  .then((results) => {
    console.log(results);
  })
  .catch((error) => {
    console.error(error);
  });


exports.handler = async (event) => {
  try {
    // Parse incoming data from the frontend
    const { email, password } = JSON.parse(event.body);

    // Hash the user's password (you should use bcrypt for security)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new database connection
    const dbClient = new Client(dbConfig);
    await dbClient.connect();

    // Insert user data into the database (replace with your database query)
    const query = `
      INSERT INTO users (email, password)
      VALUES ($1, $2)
      RETURNING id`;
    const values = [email, hashedPassword];
    const result = await dbClient.query(query, values);

    // Close the database connection
    await dbClient.end();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Registration successful' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Registration failed' }),
    };
  }
};
