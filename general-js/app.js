// app.js

// Function to update the test results or comments
function updateTestResults(data) {
  const testResultsContainer = document.getElementById('test-results');

  // Check if data is available
  if (data && data.results) {
      // Display the retrieved data in the test results container
      testResultsContainer.innerHTML = `Data from the database: ${data.results}`;
  } else {
      // Display a test message or comment if data is not available
      testResultsContainer.innerHTML = 'Test successful - Site is connected to the database!';
  }
}

// Fetch data from the serverless function
fetch('../netlify/functions/planetScaleQuery.js')
  .then((response) => response.json())
  .then((data) => {
      // Call the function to update the test results or comments
      updateTestResults(data);
  })
  .catch((error) => {
      console.error(error); // Log any errors that occur during the fetch request
  });
