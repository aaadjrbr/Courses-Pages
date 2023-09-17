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

    // Create a new database connection
    const dbClient = new Client(dbConfig);
    await dbClient.connect();

    // Retrieve user data from the database based on email
    const query = 'SELECT id, email, password FROM users WHERE email = $1';
    const result = await dbClient.query(query, [email]);

    // Check if a user with the provided email exists
    if (result.rows.length === 0) {
      await dbClient.end();
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'User not found' }),
      };
    }

    // Compare the hashed password with the provided password
    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Close the database connection
    await dbClient.end();

    if (passwordMatch) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Login successful' }),
      };
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Incorrect password' }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Login failed' }),
    };
  }
};
