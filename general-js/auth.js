// auth.js

var lock = new Auth0Lock('btLuY70GxivGYTGKVUxh0XJLmgqB4xqV', 'dev-guf031gyn3qsfpkw.us.auth0.com', {
    auth: {
        responseType: 'token id_token',
        redirectUrl: 'https://adenilsonribeiro-cursos.cloud/bem-vindo', // Replace with your callback URL
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
    // For example, remove the user's ID token from localStorage
    localStorage.removeItem('id_token');

    // Use Auth0's logout method to log the user out from Auth0
    lock.logout({
        returnTo: 'https://adenilsonribeiro-cursos.cloud/', // Replace with the URL where you want to redirect the user after logout
    });
}

// Handle the authentication callback
lock.on('authenticated', function(authResult) {
    // Extract user information from the ID token
    var idToken = authResult.idToken;
    console.log('Authenticated!', idToken);

    // Parse the ID token to access user data
    var profile = parseJwt(idToken);
    console.log('User Profile:', profile);

    // Check if the user has the "paid_user" role
    var hasPaidUserRole = profile.roles && profile.roles.includes('paid_user');

    if (hasPaidUserRole) {
        // User has the "paid_user" role, perform actions for paid users
        console.log('User is a paid user');
        // You can add code here to handle actions for paid users
    } else {
        // User does not have the "paid_user" role, perform actions for non-paid users
        console.log('User is not a paid user');
        // You can add code here to handle actions for non-paid users
    }

    // You can also store the ID token in a secure manner, depending on your application's requirements.
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
