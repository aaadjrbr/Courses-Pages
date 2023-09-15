
const users = [
    {
        nome: "adj",
        senha: "adj"
    },
    // Add more users as needed
];

// Function to handle form submission (authentication)
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the form from submitting

    const inputNome = document.getElementById("nome").value;
    const inputSenha = document.getElementById("senha").value;

    // Check if the entered nome and senha are correct (based on your sample data)
    const user = users.find(u => u.nome === inputNome && u.senha === inputSenha);

    if (user) {
        // User is authenticated, show the hidden content
        const hiddenContent = document.getElementById("hiddenContent");
        hiddenContent.style.display = "block";

        // Hide the error message (if it was displayed previously)
        const errorMessage = document.getElementById("errorMessage");
        errorMessage.style.display = "none";
    } else {
        // Authentication failed, show the error message
        const errorMessage = document.getElementById("errorMessage");
        errorMessage.style.display = "block";
    }
});
