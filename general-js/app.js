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
