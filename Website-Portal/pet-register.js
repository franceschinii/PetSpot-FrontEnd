document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const dataNascimento = document.getElementById("data-nascimento").value;
    const genero = document.getElementById("genero").value === "Macho" ? 1 : 0;
    const especie = document.getElementById("especie").value;
    const raca = document.getElementById("raca").value;
    const peso = document.getElementById("peso").value;
    const comportamento = document.getElementById("comportamento").value;
    const porte = document.getElementById("porte").value;
    const castrado = document.querySelector('input[name="castrado"]:checked').value === "sim";
    const vacinado = document.querySelector('input[name="vacinas"]:checked').value === "sim";

    if (!nome || !dataNascimento || !especie || !raca || !comportamento || !porte) {
      displayMessage("Preencha todos os campos obrigatórios.", "danger");
      return;
    }

    const [year, month, day] = dataNascimento.split("-");
    const formattedDate = `${day}/${month}/${year}`;

    const body = {
      nome,
      dataDeNascimento: formattedDate,
      genero,
      especie,
      raca,
      peso,
      comportamento,
      porte,
      castrado,
      vacinado
    };

    try {
      const ownerId = localStorage.getItem("ownerId");
      const response = await fetch(`http://localhost:8080/petspot/pet-register/${ownerId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        displayMessage(data.hasError ? data.message : 'Ocorreu um erro desconhecido.', "danger");
      } else {
        displayMessage("Pet cadastrado com sucesso!", "success");
        setTimeout(() => {
          window.location.href = "pet-list.html";
        }, 2000);
      }
    } catch (error) {
      console.error("Erro ao cadastrar pet:", error);
      displayMessage(`Ocorreu um erro: ${error.message}`, "danger");
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