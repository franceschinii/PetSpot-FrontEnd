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
      alert("Você deve concordar com os Termos de Uso.");
      return;
    }

    const [year, month, day] = dataDeNascimento.split('-');
    const formattedDate = `${day}/${month}/${year}`;

    const body = {
      nome,
      sobrenome,
      email,
      senha,
      repetirSenha,
      usuario,
      dataDeNascimento:formattedDate,
      pais,
      telefone,
      newsletterCheck,
    };

    
      const response = await fetch("https://petspot-api.azurewebsites.net/petspot/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        window.location.href = "user-login.html";
      } else {
     
        alert(`Erro: ${data.message}`);
      }
   
  });
});