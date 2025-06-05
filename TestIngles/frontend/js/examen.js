let preguntas = [];
let indice = 0;
let timer;
let tiempoRestante = 60;
const respuestasUsuario = [];
const idUsuario = localStorage.getItem("userId");
const tipoExamen = localStorage.getItem("tipo");
let idExamen;

async function iniciarExamen() {
  try {
    const res = await fetch("http://localhost:3001/examen/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_usuario: idUsuario, tipo_examen: tipoExamen }),
      credentials: "include",
    });
    const data = await res.json();
    idExamen = data.id_examen;
    localStorage.setItem("idExamen", idExamen);
    alert(`Examen iniciado con ID: ${idExamen}`);
    await cargarPreguntas();
  } catch (error) {
    alert("Error al iniciar examen");
    console.error(error);
  }
}

async function cargarPreguntas() {
  try {
    const tipo = localStorage.getItem("tipo");
    const respuesta = await fetch(`http://localhost:3001/pregunta/${tipo}`, {
      method: "GET",
      credentials: "include",
    });
    if (!respuesta.ok)
      throw new Error("Error en la solicitud: " + respuesta.status);
    preguntas = await respuesta.json();
    mostrarPregunta();
  } catch (error) {
    alert("Error cargando preguntas del servidor");
    console.error(error);
  }
}

function mostrarPregunta() {
  if (indice >= preguntas.length) {
    finalizarExamen();
    return;
  }

  const pregunta = preguntas[indice];
  const contenedor = document.getElementById("contenedor-pregunta");
  contenedor.innerHTML = "";

  const enunciado = document.createElement("p");
  enunciado.textContent = `${indice + 1}. ${pregunta.enunciado}`;
  contenedor.appendChild(enunciado);

  ["a", "b", "c", "d"].forEach((opcion) => {
    if (pregunta[`opcion_${opcion}`]) {
      const label = document.createElement("label");
      label.className = "opcion";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = "respuesta";
      input.value = opcion;

      input.addEventListener("change", () => {
        clearInterval(timer);
        guardarRespuesta(pregunta, input.value);
        indice++;
        mostrarPregunta();
      });

      label.appendChild(input);
      label.appendChild(
        document.createTextNode(" " + pregunta[`opcion_${opcion}`])
      );
      contenedor.appendChild(label);
    }
  });

  tiempoRestante = 60;
  actualizarCronometro();
  iniciarTemporizador(pregunta);
}

function iniciarTemporizador(pregunta) {
  clearInterval(timer);
  timer = setInterval(() => {
    tiempoRestante--;
    actualizarCronometro();

    if (tiempoRestante <= 0) {
      clearInterval(timer);
      guardarRespuesta(pregunta, null);
      indice++;
      mostrarPregunta();
    }
  }, 1000);
}

function actualizarCronometro() {
  document.getElementById(
    "cronometro"
  ).textContent = `Tiempo: ${tiempoRestante}`;
}

function guardarRespuesta(pregunta, seleccion) {
  const correcta = seleccion === pregunta.respuesta_correcta;
  respuestasUsuario.push({
    id_pregunta: pregunta.id_pregunta,
    respuesta_usuario: seleccion,
    es_correcta: correcta ? 1 : 0,
  });
}

async function finalizarExamen() {
  const correctas = respuestasUsuario.filter((r) => r.es_correcta).length;

  const tipo = localStorage.getItem("tipo");
  const id_examen = localStorage.getItem("idExamen");

  let valorP = 0;

  if (tipo === "prueba") {
    valorP = 5 * correctas;
  }
  if (tipo === "final") {
    valorP = 2.5 * correctas;
  }

  alert("resultado: " + valorP);
  alert("Resultado 2: " + JSON.stringify({ calificacion: valorP }));

  await fetch(`http://localhost:3001/examen/${id_examen}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ calificacion: valorP }),
    credentials: "include",
  });

  alert("RESPUESTAS: " + JSON.stringify(respuestasUsuario));

  await fetch("http://localhost:3001/respuesta", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      id_examen: idExamen,
      respuestas: respuestasUsuario,
    }),
  });

  document.getElementById(
    "contenedor-pregunta"
  ).innerHTML = `<h2>Examen finalizado</h2>`;
  document.getElementById("cronometro").style.display = "none";
  document.getElementById(
    "resultado"
  ).textContent = `Calificación: ${calificacion}`;

  window.location.href = "../html/principal.html";
}

// Inicia el examen
iniciarExamen();
