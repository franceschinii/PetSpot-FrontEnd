document.addEventListener("DOMContentLoaded", function () {
  const ownerId = localStorage.getItem("ownerId");

  if (!ownerId) {
    alert("Você não está autenticado. Por favor, faça login.");
    window.location.href = "user-login.html";
    return;
  }

  fetch(`https://petspot-api.azurewebsites.net/petspot/meuspets/${ownerId}`)
    .then(response => response.json())
    .then(pets => {
      const petsContainer = document.getElementById("pets-container");

      pets.forEach(pet => {
        const petCard = document.createElement("div");
        petCard.className = "col-md-3";

        petCard.innerHTML = `
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">${pet.nome}</h5>
              <p class="card-text">Data de Nascimento: ${formatDate(pet.idade)}</p>
              <p class="card-text">Gênero: ${pet.genero === 1 ? "Macho" : "Fêmea"}</p>
              <p class="card-text">Especie: ${pet.especie}</p>
              <p class="card-text">Raça: ${pet.raca}</p>
              <p class="card-text">Peso: ${pet.peso}g</p>
              <p class="card-text">Porte: ${pet.porte}</p>
              <p class="card-text">Comportamento: ${pet.comportamento}</p>
              <p class="card-text">Castrado: ${pet.castrado ? "Sim" : "Não"}</p>
              <p class="card-text">Tomou principais vacinas: ${pet.vacinado ? "Sim" : "Não"}</p>
            </div>
          </div>
        `;

        petsContainer.appendChild(petCard);
      });
    })
    .catch(error => {
      console.error("Erro ao buscar os pets:", error);
      alert("Erro ao buscar os pets. Tente novamente mais tarde.");
    });

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
});