// Import the required libraries
import { connect } from '@planetscale/database';

export async function handler(event, context) {
  try {
    // Define your PlanetScale database connection details
    const config = {
        host: 'aws.connect.psdb.cloud',     // Replace with your actual database host
        username: '3w9lke9ua0wg8wj2mc1r',   // Replace with your actual database username
        password: 'main-2023-09-12-41ym2o', // Replace with your actual database password
      };
      
    // Connect to the database
    const conn = connect(config);

    // Execute a sample query (you can replace this with your actual query)
    const results = await conn.execute('SELECT 1 FROM dual WHERE 1 = ?', [1]);

    // Close the database connection
    await conn.close();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Query successful', results }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred', details: error.message }),
    };
  }
}
