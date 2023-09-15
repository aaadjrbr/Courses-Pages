var lock = new Auth0Lock('btLuY70GxivGYTGKVUxh0XJLmgqB4xqV', 'dev-guf031gyn3qsfpkw.us.auth0.com', {
  auth: {
    responseType: 'token id_token',
    redirectUrl: 'https://adenilsonribeiro-cursos.cloud/bem-vindo',
    audience: 'https://dev-guf031gyn3qsfpkw.us.auth0.com/api/v2/',
    params: {
      scope: 'openid profile email',
    },
  },
});

// Function to initiate the login process
function login() {
  lock.show();
}

// Function to handle logout
function logout() {
  // Clear any user-related data or tokens from your application
  localStorage.removeItem('id_token');

  // Use Auth0's logout method to log the user out from Auth0
  lock.logout({
    returnTo: 'https://adenilsonribeiro-cursos.cloud/',
  });
}

// Handle the authentication callback
lock.on('authenticated', function(authResult) {
  // Extract user information from the ID token
  var idToken = authResult.idToken;
  console.log('Authenticated!', idToken);

  // Store the ID token in localStorage
  localStorage.setItem('id_token', idToken);

  // Redirect to the desired page (e.g., the "bem-vindo" page)
  window.location.href = 'https://adenilsonribeiro-cursos.cloud/bem-vindo';
});

// Check if the user is already logged in when the page loads
if (!localStorage.getItem('id_token')) {
  // User is not logged in, redirect to the login page
  window.location.href = 'https://adenilsonribeiro-cursos.cloud'; // Replace with your login page URL
}