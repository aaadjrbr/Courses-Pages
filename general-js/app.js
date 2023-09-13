// Import and initialize Auth0
import { Auth0Client } from '@auth0/auth0-spa-js';

const auth0 = new Auth0Client({
  domain: 'dev-guf031gyn3qsfpkw.us.auth0.com',
  client_id: 'btLuY70GxivGYTGKVUxh0XJLmgqB4xqV',
  redirect_uri: 'https://adenilsonribeiro-cursos.cloud/bem-vindo', // Replace with your callback URL
});

// Function to fetch data from the serverless function
async function fetchData() {
  try {
    const authToken = await auth0.getIdToken(); // Get the user's Auth0 ID token
    const response = await fetch('/.netlify/functions/planetScaleQuery', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      // Call the function to update the test results or comments
      updateTestResults(data);
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    console.error(error); // Log any errors that occur during the fetch request
  }
}

// Call the fetchData function when needed, such as after user authentication
