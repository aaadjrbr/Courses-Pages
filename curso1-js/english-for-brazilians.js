// User data
const users = [
    {
        nome: "adj",
        full_name: "Adenilson Ribeiro", // Add the full name field
        cursosDisponiveis: ["Course 1", "Course 2", "Course 3"],
        senha: "adj",
        email: "adj@example.com",
        // ... other user data
    },
    // Add more users as needed
];

// Function to handle form submission
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the form from submitting

    const inputNome = document.getElementById("nome").value;
    const inputSenha = document.getElementById("senha").value;

    // Check if the entered nome and senha match any user
    const user = users.find(u => u.nome === inputNome && u.senha === inputSenha);

    if (user) {
        // User is authenticated, display their personalized information
        document.getElementById("userFullName").textContent = user.full_name; // Display full name
        document.getElementById("userEmail").textContent = user.email;
        
        const userCoursesList = document.getElementById("userCourses");
        userCoursesList.innerHTML = '';
        user.cursosDisponiveis.forEach(course => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="${course}">${course}</a>`;
            userCoursesList.appendChild(li);
        });

        // Hide the username (nome) field
        document.getElementById("nome").style.display = "none";

        // Display the user information container
        document.getElementById("userInfo").style.display = "block";

        // Clear any previous error messages
        document.getElementById("errorMessage").textContent = "";
        document.getElementById("errorMessage").style.display = "none";
    } else {
        // Display an error message on the screen
        document.getElementById("errorMessage").textContent = "Falha na autenticação. Certifique-se que seu nome e/ou senha estão corretos.";
        document.getElementById("errorMessage").style.display = "block";
    }
});