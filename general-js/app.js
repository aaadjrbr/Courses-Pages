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


  // Define an array to store comments (for testing purposes)
const comments = [];

// Function to render comments on the page
function renderComments() {
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = '';

    comments.forEach((comment, index) => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `<p><strong>Comment ${index + 1}:</strong> ${comment}</p>`;
        commentsList.appendChild(commentElement);
    });
}

// Function to handle comment submission
function submitComment() {
    const commentText = document.getElementById('comment-text').value;
    if (commentText) {
        comments.push(commentText);
        document.getElementById('comment-text').value = '';
        renderComments();
    }
}

// Attach event listener to the submit button
document.getElementById('submit-comment').addEventListener('click', submitComment);

// Initial rendering of comments
renderComments();

