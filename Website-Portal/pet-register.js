document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const nomeInput = document.getElementById("nome");
  const dataNascimentoInput = document.getElementById("data-nascimento");
  const generoInput = document.getElementById("genero");
  const comportamentoInput = document.getElementById("comportamento");
  const especieInput = document.getElementById("especie");
  const pesoInput = document.getElementById("peso");
  const racaInput = document.getElementById("raca");
  const porteInput = document.getElementById("porte");
  const castradoSimInput = document.getElementById("castrado-sim");
  const vacinasSimInput = document.getElementById("vacinas-sim");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const ownerId = localStorage.getItem("ownerId");
    if (!ownerId) {
      alert("Você não está autenticado. Por favor, faça login.");
      window.location.href = "user-login.html";
      return;
    }

    const petData = {
      nome: nomeInput.value,
      especie: especieInput.value, 
      genero: generoInput.value === "macho" ? 1 : 2, 
      raca: racaInput.value,
      peso: pesoInput.value, // ou outro valor se necessário
      castrado: castradoSimInput.checked,
      comportamento: comportamentoInput.value,
      porte: porteInput.value,
      vacinado: vacinasSimInput.checked,
      dataDeNascimento: formatDate(dataNascimentoInput.value),
    };

    try {
      const response = await fetch(`https://petspot-api.azurewebsites.net/petspot/pet-register/${ownerId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(petData),
      });

      if (response.ok) {
        const savedPet = await response.json();
        localStorage.setItem("petID", savedPet.id);
        alert(`Pet cadastrado com sucesso!`);
        // Redirecionar para outra página ou limpar o formulário
        window.location.href = "pet-list.html";
      } else {
        const errorMessage = await response.text();
        alert(`Erro: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Erro ao cadastrar o pet:", error);
      alert("Erro ao cadastrar o pet. Tente novamente mais tarde.");
    }
  });

  function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  }
});