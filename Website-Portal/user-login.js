document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const loginData = {
      email: emailInput.value,
      senha: senhaInput.value,
    };

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const ownerId = await response.text();
        localStorage.setItem("ownerId", ownerId);
        alert(`Seja bem vindo tutor!`);
        // Redirecionar para a página principal ou dashboard
        window.location.href = "pet-register.html";
      } else {
        const errorMessage = await response.text();
        alert(`Erro: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao fazer login. Verifique os dados e tente novamente.");
    }
  });
});