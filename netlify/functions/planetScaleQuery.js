import { connect } from '@planetscale/database';
import { Auth0Client } from '@auth0/auth0-spa-js';

export async function handler(event, context) {
  try {
    // Check if the request includes an authentication token (JWT) from Auth0
    const authToken = event.headers.authorization;

    if (!authToken) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Unauthorized' }),
      };
    }

    // Initialize Auth0 and validate the token
    const auth0 = new Auth0Client({
      domain: 'dev-guf031gyn3qsfpkw.us.auth0.com',
      client_id: 'btLuY70GxivGYTGKVUxh0XJLmgqB4xqV',
    });

    const user = await auth0.getUser(authToken);

    if (!user) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid token' }),
      };
    }

    // Check if the user has the 'paid_user' role
    if (!user.app_metadata || !user.app_metadata.roles || !user.app_metadata.roles.includes('paid_user')) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: 'Access denied' }),
      };
    }

    // Define your PlanetScale database connection details
    const config = {
      host: 'aws.connect.psdb.cloud',     // Replace with your actual database host
      username: '3w9lke9ua0wg8wj2mc1r',   // Replace with your actual database username
      password: 'main-2023-09-12-41ym2o', // Replace with your actual database password
    };

    // Connect to the database
    const conn = connect(config);

    // Execute your PlanetScale query
    const results = await conn.execute('SELECT * FROM users');

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