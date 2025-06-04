async function checkAuth() {
  const response = await fetch("http://localhost:3001/usuario/info", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    alert("Error de autenticación. Por favor, inicia sesión.");
    window.location.href = "../html/login.html";
  } else {
    const data = await response.json();
    document.getElementById(
      "bienvenida"
    ).textContent = `¡Bienvenido, ${data.nombre}!`;

    localStorage.setItem("userId", data.id_usuario);
  }
}

async function usersin() {
  const idUsuario = localStorage.getItem("userId");
  const response = await fetch(
    `http://localhost:3001/usuario/info/sincifrado/${idUsuario}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    alert("Error al obtener estadísticas. Por favor intenta nuevamente.");
    return;
  } else {
    const data = await response.json();
    localStorage.setItem("intp", data.intentos_examen_prueba);
    localStorage.setItem("intf", data.intentos_examen_final);
    document.getElementById("general-attempts").textContent =
      data.intentos_examen_prueba;
    document.getElementById("final-attempts").textContent =
      data.intentos_examen_final;
  }
}

async function estadist() {
  const idUsuario = localStorage.getItem("userId");
  const response = await fetch(
    `http://localhost:3001/usuario/estadisticas/${idUsuario}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    alert("Error al obtener estadísticas. Por favor intenta nuevamente.");
    return;
  }

  const data = await response.json();
  const calificaciones = data.examenes.map((e) => parseFloat(e.calificacion));
  const promedio =
    calificaciones.reduce((acc, val) => acc + val, 0) / calificaciones.length ||
    0;
  document.getElementById("promedio-examenes").textContent =
    promedio.toFixed(2) + "/100";

  while (calificaciones.length < 5) calificaciones.push(null);

  const aciertos = data.resultados[0]?.total_aciertos || 0;
  const errores = data.resultados[0]?.total_errores || 0;

  new Chart(document.getElementById("lineChart"), {
    type: "line",
    data: {
      labels: ["Examen 1", "Examen 2", "Examen 3", "Examen 4", "Examen 5"],
      datasets: [
        {
          label: "Calificación",
          data: calificaciones,
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          tension: 0.3,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: { suggestedMin: 0, suggestedMax: 100 },
      },
    },
  });

  new Chart(document.getElementById("doughnutChart"), {
    type: "doughnut",
    data: {
      labels: ["Aciertos", "Errores"],
      datasets: [
        {
          data: [aciertos, errores],
          backgroundColor: ["#10b981", "#ef4444"],
          borderColor: ["#059669", "#dc2626"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      cutout: "50%",
    },
  });
}

document.getElementById("btn-prueba").addEventListener("click", function () {
  localStorage.setItem("tipo", "prueba");
  async function intentos_prueba() {
    const idUsuario = localStorage.getItem("userId");
    const intentos = localStorage.getItem("intp") - 1;
    const data = { intentos_examen_prueba: intentos };
    alert("data" + JSON.stringify(data));
    alert(`Intentos restantes para el examen de prueba: ${intentos}`);
    const response = await fetch(`http://localhost:3001/usuario/${idUsuario}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      alert("Error al obtener estadísticas. Por favor intenta nuevamente.");
      return;
    }
  }
  intentos_prueba();
  window.location.href = "../html/examen.html";
});

document.getElementById("btn-final").addEventListener("click", function () {
  localStorage.setItem("tipo", "final");
  async function intentos_prueba() {
    const idUsuario = localStorage.getItem("userId");
    const intentos = localStorage.getItem("intf") - 1;
    const data = { intentos_examen_final: intentos };
    alert("data" + JSON.stringify(data));
    alert(`Intentos restantes para el examen de final: ${intentos}`);
    const response = await fetch(`http://localhost:3001/usuario/${idUsuario}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      alert("Error al obtener estadísticas. Por favor intenta nuevamente.");
      return;
    }
  }
  intentos_prueba();
  window.location.href = "../html/examen.html";
});

window.onload = () => {
  checkAuth();
  usersin();
  estadist();
};
