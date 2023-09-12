// Function to render comments from PlanetScale on the page
function renderComments() {
  const commentsList = document.getElementById('comments-list');
  commentsList.innerHTML = '';

  // Fetch comments from your PlanetScale database
  fetch('../netlify/functions/getComments')
      .then((response) => response.json())
      .then((data) => {
          // Check if data contains comments
          if (data.comments && data.comments.length > 0) {
              data.comments.forEach((comment, index) => {
                  const commentElement = document.createElement('div');
                  commentElement.classList.add('comment');
                  commentElement.innerHTML = `<p><strong>Comment ${index + 1}:</strong> ${comment}</p>`;
                  commentsList.appendChild(commentElement);
              });
          } else {
              commentsList.innerHTML = '<p>No comments available.</p>';
          }
      })
      .catch((error) => {
          console.error(error); // Log any errors that occur during the fetch request
      });
}

// Function to handle comment submission
function submitComment() {
  const commentText = document.getElementById('comment-text').value;
  if (commentText) {
      // Submit the comment to your PlanetScale database
      fetch('../netlify/functions/addComment', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ comment: commentText }),
      })
      .then((response) => response.json())
      .then((data) => {
          // Check if the comment was successfully added (you can define success criteria in your serverless function)
          if (data.success) {
              document.getElementById('comment-text').value = '';
              renderComments();
          } else {
              console.error('Failed to add comment.');
          }
      })
      .catch((error) => {
          console.error(error); // Log any errors that occur during the fetch request
      });
  }
}

// Attach event listener to the submit button
document.getElementById('submit-comment').addEventListener('click', submitComment);

// Initial rendering of comments
renderComments();
