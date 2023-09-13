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

    // You can now use the 'idToken' to verify the user's identity and perform actions on the client-side as needed.
    
    // For example, you can display the user's name and email
    var profile = parseJwt(idToken);
    console.log('User Profile:', profile);

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