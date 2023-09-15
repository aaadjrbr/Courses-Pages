// Initialize Auth0
const auth0 = new Auth0Client({
  domain: 'dev-guf031gyn3qsfpkw.us.auth0.com',
  client_id: 'btLuY70GxivGYTGKVUxh0XJLmgqB4xqV',
  redirect_uri: 'https://adenilsonribeiro-cursos.cloud/bem-vindo', // Replace with your callback URL
});

// Login function
const login = async () => {
  try {
    await auth0.loginWithRedirect();
  } catch (error) {
    console.error('Login error:', error);
  }
};

// Logout function
const logout = async () => {
  try {
    await auth0.logout();
  } catch (error) {
    console.error('Logout error:', error);
  }
};

// Check if the user is authenticated
const isAuthenticated = async () => {
  return await auth0.isAuthenticated();
};

// Handle the authentication callback (in your callback route)
const handleAuthenticationCallback = async () => {
  try {
    await auth0.handleRedirectCallback();
  } catch (error) {
    console.error('Authentication callback error:', error);
  }

  // Check if the user is authenticated after the callback
  const authenticated = await isAuthenticated();

  if (authenticated) {
    document.getElementById('login-button').style.display = 'none';
    document.getElementById('logout-button').style.display = 'block';
  }
};

// Add event listeners for login and logout buttons
document.getElementById('login-button').addEventListener('click', login);
document.getElementById('logout-button').addEventListener('click', logout);

// Run handleAuthenticationCallback on page load (for the callback route)
handleAuthenticationCallback();
