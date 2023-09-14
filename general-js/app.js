// Import necessary libraries and modules
import 'dotenv/config';
import { connect } from '@planetscale/database';
import { Auth0Client } from '@auth0/auth0-spa-js';

// Define your PlanetScale database connection details
const config = {
  host: 'aws.connect.psdb.cloud',
  username: '3w9lke9ua0wg8wj2mc1r',
  password: 'main-2023-09-12-41ym2o',
};

// Initialize the database connection
const conn = connect(config);

// Function to execute a PlanetScale query
async function executePlanetScaleQuery(query) {
  try {
    const results = await conn.execute(query);
    return results;
  } catch (error) {
    console.error('Error executing PlanetScale query:', error);
    throw error;
  }
}

// Import and initialize Auth0
const auth0 = new Auth0Client({
  domain: 'dev-guf031gyn3qsfpkw.us.auth0.com',
  client_id: 'btLuY70GxivGYTGKVUxh0XJLmgqB4xqV',
  redirect_uri: 'https://adenilsonribeiro-cursos.cloud/bem-vindo', // Replace with your callback URL
});

// Function to fetch data from the serverless function
async function fetchData() {
  try {
    const authToken = await auth0.getIdToken(); // Get the user's Auth0 ID token

    // Fetch data from your serverless function using the Auth0 token
    const response = await fetch('./netlify/functions/planetScaleQuery', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      // Handle the fetched data as needed (e.g., update your webpage)
      updateWebpageWithData(data);
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    console.error(error); // Log any errors that occur during the fetch request
  }
}

// Function to update your webpage with the fetched data
function updateWebpageWithData(data) {
  // Replace this part with your actual code to update the webpage
  console.log('Fetched data:', data);
  // Example: Display the data in an HTML element with ID 'dataDisplay'
  document.getElementById('dataDisplay').textContent = JSON.stringify(data, null, 2);
}

// Event listener for a button click to trigger data fetching
document.getElementById('fetchDataButton').addEventListener('click', fetchData);

// Call the fetchData function when needed, such as after user authentication
// This can be triggered by a user action (e.g., clicking a button)

// Example usage:
// fetchData();

// Note: Make sure to include the HTML structure and elements as needed in your webpage.
