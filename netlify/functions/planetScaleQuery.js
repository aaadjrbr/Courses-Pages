// Import the required libraries
import { connect } from '@planetscale/database';

export async function handler(event, context) {
  try {
    // Define your PlanetScale database connection details
    const config = {
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
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
