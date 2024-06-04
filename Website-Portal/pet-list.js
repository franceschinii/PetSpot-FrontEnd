async function fetchData() {
  const ownerId = localStorage.getItem("ownerId");
  console.log(ownerId); // Verifique se o ownerId está sendo recuperado

  if (!ownerId) {
    displayMessage("Owner ID não encontrado no localStorage.", "danger");
    return;
  }

  const apiUrl = `http://localhost:8080/petspot/meuspets/${ownerId}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data); // Verifique os dados retornados pela API

    if (!response.ok) {
      displayMessage(data.message || "Erro desconhecido", "danger");
    } else {
      createCards(data);
    }
  } catch (error) {
    displayMessage(`Erro ao buscar dados: ${error.message}`, "danger");
  }
}

function createCards(data) {
  const container = document.getElementById("pet-cards-container");
  console.log(container); // Verifique se o container está sendo selecionado corretamente

  if (Array.isArray(data) && data.length > 0) {
    data.forEach((item, index) => {
      const cardColumn = document.createElement("div");
      cardColumn.classList.add("col-md-3", "col-sm-6", "mb-4");

      const card = document.createElement("div");
      card.classList.add("card", "h-100", "position-relative");

      const image = document.createElement("img");
      image.src = "https://www.svgrepo.com/show/452956/dog-head-profile.svg";
      image.classList.add("card-img-top");
      image.alt = "...";

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      const nome = document.createElement("h5");
      nome.classList.add("text-center");
      nome.textContent = item.nome;

      const listGroup = document.createElement("ul");
      listGroup.classList.add("list-group", "list-group-flush");

      const itemIdade = document.createElement("li");
      itemIdade.classList.add("list-group-item");
      itemIdade.textContent = "Data de Nascimento: " + (item.dataDeNascimento ? formatDate(item.dataDeNascimento) : "Não disponível");

      const itemGenero = document.createElement("li");
      itemGenero.classList.add("list-group-item");
      itemGenero.textContent = "Sexo: " + (item.genero === 1 ? "Macho" : "Fêmea");

      const itemRaca = document.createElement("li");
      itemRaca.classList.add("list-group-item");
      itemRaca.textContent = "Raça: " + item.raca;

      listGroup.appendChild(itemIdade);
      listGroup.appendChild(itemGenero);
      listGroup.appendChild(itemRaca);

      cardBody.appendChild(nome);
      card.appendChild(image);
      card.appendChild(cardBody);
      card.appendChild(listGroup);
      cardColumn.appendChild(card);

      // Adicionando os três pontinhos para exibir detalhes
      const modalButtonDiv = document.createElement("div");
      modalButtonDiv.classList.add("position-absolute", "top-0", "end-0", "p-2");

      const modalButton = document.createElement("a");
      modalButton.setAttribute("type", "button");
      modalButton.setAttribute("data-bs-toggle", "modal");
      modalButton.setAttribute("data-bs-target", `#modal-${index}`);

      const modalIcon = document.createElement("ion-icon");
      modalIcon.setAttribute("name", "ellipsis-horizontal");
      modalIcon.classList.add("modal-icon");

      modalButton.appendChild(modalIcon);
      modalButtonDiv.appendChild(modalButton);
      card.appendChild(modalButtonDiv);

      const modal = document.createElement("div");
      modal.classList.add("modal", "fade");
      modal.id = `modal-${index}`;
      modal.setAttribute("tabindex", "-1");
      modal.setAttribute("aria-labelledby", `modal-label-${index}`);
      modal.setAttribute("aria-hidden", "true");

      const modalDialog = document.createElement("div");
      modalDialog.classList.add("modal-dialog");

      const modalContent = document.createElement("div");
      modalContent.classList.add("modal-content");

      const modalHeader = document.createElement("div");
      modalHeader.classList.add("modal-header");

      const modalTitle = document.createElement("h1");
      modalTitle.classList.add("modal-title", "fs-5");
      modalTitle.id = `modal-label-${index}`;
      modalTitle.textContent = item.nome;

      const modalCloseButton = document.createElement("button");
      modalCloseButton.classList.add("btn-close");
      modalCloseButton.setAttribute("type", "button");
      modalCloseButton.setAttribute("data-bs-dismiss", "modal");
      modalCloseButton.setAttribute("aria-label", "Close");

      const modalBody = document.createElement("div");
      modalBody.classList.add("modal-body");

      const modalList = document.createElement("ul");
      modalList.classList.add("list-group");

      const modalItemIdade = document.createElement("li");
      modalItemIdade.classList.add("list-group-item");
      modalItemIdade.innerHTML =
        "Data de Nascimento: <b>" + (item.dataDeNascimento ? formatDate(item.dataDeNascimento) : "Não disponível") + "</b>";

      const modalItemGenero = document.createElement("li");
      modalItemGenero.classList.add("list-group-item");
      modalItemGenero.innerHTML = "Sexo: <b>" + (item.genero === 1 ? "Macho" : "Fêmea") + "</b>";

      const modalItemComportamento = document.createElement("li");
      modalItemComportamento.classList.add("list-group-item");
      modalItemComportamento.innerHTML =
        "Comportamento: <b>" + item.comportamento + "</b>";

      const modalItemEspecie = document.createElement("li");
      modalItemEspecie.classList.add("list-group-item");
      modalItemEspecie.innerHTML = "Espécie: <b>" + item.especie + "</b>";

      const modalItemRaca = document.createElement("li");
      modalItemRaca.classList.add("list-group-item");
      modalItemRaca.innerHTML = "Raça: <b>" + item.raca + "</b>";

      const modalItemPeso = document.createElement("li");
      modalItemPeso.classList.add("list-group-item");
      modalItemPeso.innerHTML = "Peso: <b>" + (item.peso || "Não disponível") + "kg</b>";

      const modalItemPorte = document.createElement("li");
      modalItemPorte.classList.add("list-group-item");
      modalItemPorte.innerHTML = "Porte: <b>" + item.porte + "</b>";

      const modalItemCastrado = document.createElement("li");
      modalItemCastrado.classList.add("list-group-item");
      modalItemCastrado.innerHTML =
        "Castrado: <b>" + (item.castrado ? "Sim" : "Não") + "</b>";

      const modalItemVacinado = document.createElement("li");
      modalItemVacinado.classList.add("list-group-item");
      modalItemVacinado.innerHTML =
        "Vacinado: <b>" + (item.vacinado ? "Sim" : "Não") + "</b>";

      modalList.appendChild(modalItemIdade);
      modalList.appendChild(modalItemGenero);
      modalList.appendChild(modalItemComportamento);
      modalList.appendChild(modalItemEspecie);
      modalList.appendChild(modalItemRaca);
      modalList.appendChild(modalItemPeso);
      modalList.appendChild(modalItemPorte);
      modalList.appendChild(modalItemCastrado);
      modalList.appendChild(modalItemVacinado);

      modalBody.appendChild(modalList);
      modalHeader.appendChild(modalTitle);
      modalHeader.appendChild(modalCloseButton);
      modalContent.appendChild(modalHeader);
      modalContent.appendChild(modalBody);
      modalDialog.appendChild(modalContent);
      modal.appendChild(modalDialog);

      const modalFooter = document.createElement("div");
      modalFooter.classList.add("modal-footer");

      const modalEditButton = document.createElement("button");
      modalEditButton.setAttribute("type", "button");
      modalEditButton.classList.add("btn", "btn-secondary");
      modalEditButton.textContent = "Editar";
      modalEditButton.addEventListener("click", () => {
        const currentModal = document.getElementById(`modal-${index}`);
        const modal = bootstrap.Modal.getInstance(currentModal);
        modal.hide();

        const editModal = new bootstrap.Modal(
          document.getElementById("modal2")
        );
        editModal.show();
      });

      const modalCloseButton2 = document.createElement("button");
      modalCloseButton2.setAttribute("type", "button");
      modalCloseButton2.classList.add("btn", "btn-primary");
      modalCloseButton2.setAttribute("data-bs-dismiss", "modal");
      modalCloseButton2.textContent = "Fechar";

      modalFooter.appendChild(modalEditButton);
      modalFooter.appendChild(modalCloseButton2);
      modalContent.appendChild(modalFooter);

      modalDialog.appendChild(modalContent);
      modal.appendChild(modalDialog);

      container.appendChild(cardColumn);
      container.appendChild(modal);
    });
  } 
}

function formatDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date)) return "Data não disponível";
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function displayMessage(message, type) {
  const responseMessages = document.getElementById("response-messages");
  responseMessages.innerHTML = "";
  const messageElement = document.createElement("div");
  messageElement.className = `alert alert-${type}`;
  messageElement.role = "alert";
  messageElement.textContent = message;
  responseMessages.appendChild(messageElement);
}

window.onload = fetchData;