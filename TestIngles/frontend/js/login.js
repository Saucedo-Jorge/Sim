const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(loginForm);
  const data = {
    correo: formData.get("usuario"),
    contrasena: formData.get("password"),
  };

  console.log("Datos del formulario de login:", data);
  try {
    const res = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      // Si el login es exitoso, redirige a la vista protegida
      window.location.href = "../html/principal.html"; // futuro archivo
    }
  } catch (err) {
    console.error("Error:", err);
    document.getElementById("mensaje").textContent =
      "Ocurrió un error en el login. Verifica tus credenciales.";
  }
});
