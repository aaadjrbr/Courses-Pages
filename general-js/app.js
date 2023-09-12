fetch('/..netlify/functions/planetScaleQuery')
  .then((response) => response.json())
  .then((data) => {
    console.log(data); // Do something with the database query results
  });