document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("login-form");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const body = { email, senha };
    
    // Chamando a função loginUser e utilizando Try catch para verificar erros.
    try {
      const data = await loginUser(body);
      localStorage.setItem("ownerId", data.ownerId)
      window.location.href = "pet-list.html";
    } catch (error) {
      displayMessage(error.message, "danger");
    }
  });

  const responseMessages = document.getElementById("response-messages");

  function displayMessage(message, type) {
    responseMessages.innerHTML = "";
    // Cria um elemento div para a mensagem
    const messageElement = document.createElement("div");
    messageElement.className = `alert alert-${type}`; // Adiciona a classe Bootstrap para estilização
    messageElement.role = "alert"; // Define o papel do elemento como alerta
    messageElement.textContent = message; // Define o texto da mensagem
    // Adiciona o elemento de mensagem ao contêiner de mensagens
    responseMessages.appendChild(messageElement);
  }

  async function loginUser(body) {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    let data;
    try {
      data = await response.json();
    } catch (error) {
      throw new Error("A resposta do servidor não está em formato JSON.");
    }

    if (!response.ok) {
      if (data.error) {
        throw new Error(data.error);
      } else {
        throw new Error("Ocorreu um erro desconhecido.");
      }
    }

    return data;
  }
});