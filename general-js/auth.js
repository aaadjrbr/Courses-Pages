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

  // Check if the user has the "paid_user" metadata
  var profile = parseJwt(idToken);
  if (profile && profile['https://your-namespace/paid_user'] === true) {
    // User is a paid user, continue with your application logic
    document.getElementById('protected-content').style.display = 'block';
  } else {
    // User is not a paid user, handle this case (e.g., show an error message)
    console.log('User is not a paid user. Access denied.');
    // You may also want to log the user out in this case
    logout();
    showError('Access denied. You must be a paid user to log in.');
  }
});

// Function to parse JWT (ID token)
function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
