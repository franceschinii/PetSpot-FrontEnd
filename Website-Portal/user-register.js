document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const sobrenome = document.getElementById("sobrenome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const repetirSenha = document.getElementById("repetir-senha").value;
    const usuario = document.getElementById("usuario").value;
    const dataDeNascimento = document.getElementById("data-nascimento").value;
    const pais = document.getElementById("pais").value;
    const telefone = document.getElementById("telefone").value;
    const newsletterCheck = document.getElementById("newsletter-check").checked;
    const termosCheck = document.getElementById("termos-check").checked;

    if (!termosCheck) {
      displayMessage("Você deve concordar com os Termos de Uso.", "danger");
      return;
    }

    if (!nome || !sobrenome || !email || !senha || !repetirSenha || !usuario || !dataDeNascimento || !pais || !telefone) {
      displayMessage("Preencha todos os campos.", "danger");
      return;
    }

    if (senha !== repetirSenha) {
      displayMessage("As senhas não coincidem.", "danger");
      return;
    }

    const [year, month, day] = dataDeNascimento.split("-");
    const formattedDate = `${day}/${month}/${year}`;

    const body = {
      nome,
      sobrenome,
      email,
      senha,
      repetirSenha,
      usuario,
      dataDeNascimento: formattedDate,
      pais,
      telefone,
      newsletterCheck,
    };

    try {
      const response = await fetch("http://localhost:8080/petspot/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        //alert(data.hasError ? data.message : 'Ocorreu um erro desconhecido.');
        displayMessage(data.hasError ? data.message : 'Ocorreu um erro desconhecido.', "danger");
      } else {
        window.location.href = "user-login.html";
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`Ocorreu um erro: ${error.message}`);
    }
  });

  const responseMessages = document.getElementById("response-messages");

  function displayMessage(message, type) {
    responseMessages.innerHTML = "";
    const messageElement = document.createElement("div");
    messageElement.className = `alert alert-${type}`;
    messageElement.role = "alert";
    messageElement.textContent = message;
    responseMessages.appendChild(messageElement);
  }
});