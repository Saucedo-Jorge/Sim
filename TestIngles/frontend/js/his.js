document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.getElementById("contenedor-examen");
  const idUsuario = localStorage.getItem("userId");

  try {
    const response = await fetch(
      `http://localhost:3001/respuesta/history/${idUsuario}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener estadísticas");
    }

    const respuestas = await response.json();

    // Agrupar por id_examen
    const examenes = {};
    respuestas.forEach((respuesta) => {
      const idExamen = respuesta.id_examen;
      if (!examenes[idExamen]) {
        examenes[idExamen] = [];
      }
      examenes[idExamen].push(respuesta);
    });

    // Recorrer cada examen y mostrar sus respuestas
    Object.entries(examenes).forEach(([idExamen, respuestasDelExamen]) => {
      // Título del examen
      const encabezado = document.createElement("h2");
      encabezado.className = "text-xl font-semibold mt-6 mb-2";
      encabezado.textContent = `Examen ID: ${idExamen}`;
      contenedor.appendChild(encabezado);

      // Contenedor de las respuestas de ese examen
      respuestasDelExamen.forEach((respuesta, index) => {
        const div = document.createElement("div");
        div.className = `p-4 mb-2 rounded-lg shadow ${
          respuesta.es_correcta
            ? "bg-green-100 border border-green-400"
            : "bg-red-100 border border-red-400"
        }`;

        div.innerHTML = `
          <p class="font-bold">Pregunta ${index + 1} (ID: ${
          respuesta.id_pregunta
        })</p>
          <p>Tu respuesta: <strong>${respuesta.respuesta_usuario.toUpperCase()}</strong></p>
          <p>${respuesta.es_correcta ? "✅ Correcta" : "❌ Incorrecta"}</p>
        `;

        contenedor.appendChild(div);
      });
    });
  } catch (error) {
    alert("Error al obtener estadísticas. Por favor intenta nuevamente.");
    console.error(error);
  }
});
