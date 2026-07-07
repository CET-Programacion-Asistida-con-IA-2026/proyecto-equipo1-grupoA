// 🔑 PEGÁ TU API KEY DE GOOGLE GEMINI ACÁ
// Conseguila en: aistudio.google.com → Get API Key
const GEMINI_API_KEY = "AQ.Ab8RN6LaKOjx8LgfOuFfjISu4mj2y8xpuXVZwZZmKuGBuxx9Bg"; 

async function llamarIA(prompt) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      })
    }
  );

  const data = await res.json();

  console.log(data);

  if (data.error) {
    throw new Error(data.error.message);
  }

  return data.candidates[0].content.parts[0].text;
}

document.getElementById("quizForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const experiencia = document.getElementById("experiencia").value;
  const discapacidad = document.getElementById("discapacidad").value;

  document.getElementById("res-sin-si").classList.add("oculto");
  document.getElementById("res-sin-no").classList.add("oculto");
  document.getElementById("res-con").classList.add("oculto");

  if (experiencia === "sin" && discapacidad === "si") {
    document.getElementById("res-sin-si").classList.remove("oculto");
  } else if (experiencia === "sin" && discapacidad === "no") {
    document.getElementById("res-sin-no").classList.remove("oculto");
  } else if (experiencia === "con") {
    document.getElementById("res-con").classList.remove("oculto");
  }
});

function toggleFormComentario() {
  document.getElementById("comentarioFormWrap").classList.toggle("oculto");
}

document.getElementById("comentarioForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const comentario = document.getElementById("comentario").value;
  const div = document.createElement("div");
  div.classList.add("comentario");
  div.innerHTML = `<h4>${nombre}</h4><p>${comentario}</p>`;
  document.getElementById("comentariosLista").appendChild(div);
  this.reset();
  document.getElementById("comentarioFormWrap").classList.add("oculto");
});

let reviewsData = [
  { empresa: "Mercado Libre", puesto: "Analista de Datos", calificacion: "4.8", comentario: "Excelente cultura de trabajo.", link: "https://jobs.mercadolibre.com/" },
  { empresa: "Globant", puesto: "Desarrollador Frontend", calificacion: "4.2", comentario: "Muy buen ambiente y trabajo remoto.", link: "https://career.globant.com/" },
  { empresa: "Accenture", puesto: "Consultor", calificacion: "4.0", comentario: "Gran flexibilidad horaria.", link: "https://www.accenture.com/ar-es/careers" },
  { empresa: "Santander", puesto: "Atención al Cliente", calificacion: "4.1", comentario: "Muy buena formación inicial.", link: "https://www.santander.com.ar/banco/online/personas/nuestro-banco/trabaja-con-nosotros" },
  { empresa: "YPF", puesto: "Ingeniero Junior", calificacion: "4.5", comentario: "Excelente programa de jóvenes profesionales.", link: "https://www.ypf.com/somosypf/Paginas/Trabaja-con-nosotros.aspx" },
  { empresa: "Teleperformance", puesto: "Representante Bilingüe", calificacion: "3.5", comentario: "Ideal para primera experiencia.", link: "https://www.teleperformance.com/es-es/career/" },
  { empresa: "IBM", puesto: "Cloud Specialist", calificacion: "4.3", comentario: "Mucha inversión en cursos gratuitos.", link: "https://www.ibm.com/careers" }
];

function renderReviews(filter = "") {
  const list = document.getElementById("reviewsList");
  if (!list) return;
  list.innerHTML = "";
  const filtered = reviewsData.filter(r =>
    r.empresa.toLowerCase().includes(filter.toLowerCase()) ||
    r.puesto.toLowerCase().includes(filter.toLowerCase())
  );
  filtered.forEach(r => {
    const div = document.createElement("div");
    div.className = "review-card";
    div.innerHTML = `
      <h4 class="review-title">${r.puesto} — <strong>${r.empresa}</strong></h4>
      <div class="review-rating">★ ${r.calificacion}</div>
      <p class="review-text">${r.comentario}</p>
      <a href="${r.link}" target="_blank" class="btn">Postularse en ${r.empresa}</a>
    `;
    list.appendChild(div);
  });
}

const addReviewForm = document.getElementById("addReviewForm");
if (addReviewForm) {
  addReviewForm.addEventListener("submit", (e) => {
    e.preventDefault();
    reviewsData.push({
      empresa: document.getElementById("newEmpresa").value,
      puesto: document.getElementById("newPuesto").value,
      calificacion: document.getElementById("newRating").value,
      comentario: document.getElementById("newComentario").value,
      link: "#"
    });
    renderReviews();
    addReviewForm.reset();
    alert("¡Reseña agregada con éxito!");
  });
}

const searchReviewsInput = document.getElementById("searchReviews");
if (searchReviewsInput) {
  searchReviewsInput.addEventListener("input", (e) => renderReviews(e.target.value));
}
renderReviews();

function toggleFormReseña() {
  document.getElementById("reviewFormWrap").classList.toggle("oculto");
}

document.getElementById("foroForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const titulo = document.getElementById("tituloAviso").value;
  const detalle = document.getElementById("detalleAviso").value;
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `<h4>${titulo}</h4><p>${detalle}</p>`;
  document.getElementById("listaAvisos").appendChild(div);
  e.target.reset();
});

function toggleFormForo() {
  document.getElementById("foroFormWrap").classList.toggle("oculto");
}

document.getElementById("voluntarioForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombreVol").value;
  alert("¡Gracias por sumarte, " + nombre + "! Nos pondremos en contacto pronto.");
  e.target.reset();
});

function toggleFormVoluntario() {
  document.getElementById("voluntarioFormWrap").classList.toggle("oculto");
}

function abrirHerramienta(tipo) {
  const modal = document.getElementById("modalIA");
  const body = document.getElementById("modalIABody");
  const tpl = document.getElementById("tpl-" + tipo);
  body.innerHTML = "";
  body.appendChild(tpl.content.cloneNode(true));
  modal.classList.add("activo");
  document.body.style.overflow = "hidden";

  if (tipo === "cv") initCV();
  if (tipo === "entrevista") initEntrevista();
  if (tipo === "detector") initDetector();
}

function cerrarHerramienta() {
  document.getElementById("modalIA").classList.remove("activo");
  document.body.style.overflow = "";
}

document.getElementById("modalIA").addEventListener("click", function(e) {
  if (e.target === this) cerrarHerramienta();
});

let cvStep = 1;
const cvTotalSteps = 5;
let cvChipsSeleccionados = new Set();

function initCV() {
  cvStep = 1;
  cvChipsSeleccionados = new Set();
  cvUpdateUI();

  document.querySelectorAll("#cvChipsGrid .chip").forEach(chip => {
    chip.addEventListener("click", () => {
      chip.classList.toggle("selected");
      const val = chip.dataset.val;
      cvChipsSeleccionados.has(val) ? cvChipsSeleccionados.delete(val) : cvChipsSeleccionados.add(val);
    });
  });
}

function cvUpdateUI() {
  const pct = (cvStep / cvTotalSteps) * 100;
  document.getElementById("cvProgressBar").style.width = pct + "%";
  document.getElementById("cvStepLabel").textContent = `Paso ${cvStep} de ${cvTotalSteps}`;

  document.querySelectorAll(".tool-step").forEach(s => s.classList.remove("active"));
  document.querySelector(`.tool-step[data-step="${cvStep}"]`).classList.add("active");

  document.getElementById("cvBtnPrev").style.display = cvStep > 1 ? "inline-block" : "none";
  document.getElementById("cvBtnNext").style.display = cvStep < cvTotalSteps ? "inline-block" : "none";
  document.getElementById("cvBtnGenerate").style.display = cvStep === cvTotalSteps ? "inline-block" : "none";
}

function cvNext() {
  if (cvStep === 1 && !document.getElementById("cvNombre").value.trim()) {
    alert("Por favor ingresá tu nombre para continuar."); return;
  }
  if (cvStep === 2 && !document.getElementById("cvPuesto").value.trim()) {
    alert("Por favor indicá a qué trabajo querés aplicar."); return;
  }
  if (cvStep < cvTotalSteps) { cvStep++; cvUpdateUI(); }
}

function cvPrev() {
  if (cvStep > 1) { cvStep--; cvUpdateUI(); }
}

async function cvGenerar() {
  const datos = {
    nombre: document.getElementById("cvNombre").value.trim(),
    email: document.getElementById("cvEmail").value.trim(),
    telefono: document.getElementById("cvTelefono").value.trim(),
    ubicacion: document.getElementById("cvUbicacion").value.trim(),
    puesto: document.getElementById("cvPuesto").value.trim(),
    experiencia: document.getElementById("cvExperiencia").value.trim(),
    educacion: document.getElementById("cvEducacion").value.trim(),
    cursos: document.getElementById("cvCursos").value.trim(),
    habilidades: [...cvChipsSeleccionados].join(", "),
    habilidadesExtra: document.getElementById("cvHabilidadesExtra").value.trim(),
    idiomas: document.getElementById("cvIdiomas").value.trim(),
    disponibilidad: document.getElementById("cvDisponibilidad").value,
    objetivo: document.getElementById("cvObjetivo").value.trim(),
  };

  document.getElementById("cvSteps").style.display = "none";
  document.querySelectorAll(".tool-nav").forEach(n => n.style.display = "none");
  document.getElementById("cvLoading").style.display = "block";

  const prompt = `Sos un especialista en recursos humanos en Argentina. Generá el contenido de un CV profesional en español para una persona que puede no tener mucha experiencia formal.

Datos:
- Nombre: ${datos.nombre}
- Puesto al que aplica: ${datos.puesto}
- Experiencia / vida cotidiana: ${datos.experiencia || "No especificada"}
- Educación: ${datos.educacion || "No especificada"}
- Cursos y talleres: ${datos.cursos || "Ninguno"}
- Habilidades: ${datos.habilidades || "Ninguna"}
- Otras habilidades: ${datos.habilidadesExtra || "Ninguna"}
- Idiomas: ${datos.idiomas || "Español"}
- Disponibilidad: ${datos.disponibilidad || "A definir"}
- Objetivo personal: ${datos.objetivo || "No especificado"}

Respondé SOLO con un JSON con esta estructura exacta, sin markdown ni texto extra:
{
  "objetivo": "2-3 oraciones profesionales sobre el perfil",
  "experiencia": [{"titulo": "Rol o actividad", "descripcion": "Descripción breve"}],
  "educacion": [{"titulo": "Nivel o institución", "descripcion": "Descripción breve"}],
  "habilidades": ["habilidad1", "habilidad2"],
  "idiomas": ["Idioma - Nivel"],
  "datos_extra": "disponibilidad y datos adicionales"
}

Transformá las actividades cotidianas en competencias laborales reales. Usá lenguaje profesional y cercano, apropiado para Argentina.`;

  try {
    const texto = await llamarIA(prompt);
    const cvData = JSON.parse(texto.replace(/```json|```/g, "").trim());
    document.getElementById("cvLoading").style.display = "none";
    cvMostrarResultado(datos, cvData);
  } catch (err) {
    console.error(err);
    document.getElementById("cvLoading").style.display = "none";
    document.getElementById("cvSteps").style.display = "block";
    document.querySelectorAll(".tool-nav").forEach(n => n.style.flex = "row");
    alert("Hubo un error al generar el CV. Verificá tu API key e intentá de nuevo.");
  }
}

function cvMostrarResultado(datos, cvData) {
  const contacto = [
    datos.email && `📧 ${datos.email}`,
    datos.telefono && `📱 ${datos.telefono}`,
    datos.ubicacion && `📍 ${datos.ubicacion}`,
  ].filter(Boolean).join("  ·  ");

  const expHTML = cvData.experiencia?.length
    ? `<ul>${cvData.experiencia.map(e => `<li><strong>${e.titulo}:</strong> ${e.descripcion}</li>`).join("")}</ul>`
    : "<p>—</p>";

  const eduHTML = cvData.educacion?.length
    ? `<ul>${cvData.educacion.map(e => `<li><strong>${e.titulo}:</strong> ${e.descripcion}</li>`).join("")}</ul>`
    : "<p>—</p>";

  const habHTML = cvData.habilidades?.length
    ? `<div class="cv-tags-wrap">${cvData.habilidades.map(h => `<span class="cv-tag">${h}</span>`).join("")}</div>`
    : "<p>—</p>";

  const idiomasHTML = cvData.idiomas?.length
    ? cvData.idiomas.map(i => `<p>${i}</p>`).join("")
    : "<p>Español</p>";

  document.getElementById("cvPreview").innerHTML = `
    <div class="cv-header-block">
      <div class="cv-nombre">${datos.nombre}</div>
      <div class="cv-puesto-label">${datos.puesto}</div>
      ${contacto ? `<div class="cv-contacto-info">${contacto}</div>` : ""}
    </div>
    <div class="cv-body-grid">
      ${cvData.objetivo ? `<div class="cv-sec full"><h4>Perfil Profesional</h4><p>${cvData.objetivo}</p></div>` : ""}
      <div class="cv-sec full"><h4>Experiencia</h4>${expHTML}</div>
      <div class="cv-sec"><h4>Educación</h4>${eduHTML}</div>
      <div class="cv-sec"><h4>Idiomas</h4>${idiomasHTML}${cvData.datos_extra ? `<p style="margin-top:0.4rem;font-size:0.82rem;color:#6b7280;">${cvData.datos_extra}</p>` : ""}</div>
      <div class="cv-sec full"><h4>Habilidades</h4>${habHTML}</div>
    </div>
  `;

  document.getElementById("cvResultado").classList.remove("oculto");
}

function cvReiniciar() { abrirHerramienta("cv"); }

let entPreguntas = [];
let entRespuestas = [];
let entFeedbacks = [];
let entActualIdx = 0;
let entTotal = 5;
let entPuestoGuardado = "";
let entNivelGuardado = "";

function initEntrevista() {
  entPreguntas = [];
  entRespuestas = [];
  entFeedbacks = [];
  entActualIdx = 0;
}

async function entIniciar() {
  entPuestoGuardado = document.getElementById("entPuesto").value.trim();
  entNivelGuardado = document.getElementById("entNivel").value;
  const tipoRadio = document.querySelector("input[name='entTipo']:checked");
  entTotal = tipoRadio ? parseInt(tipoRadio.value) : 5;

  if (!entPuestoGuardado) { alert("Por favor ingresá el puesto al que querés aplicar."); return; }
  if (!entNivelGuardado) { alert("Por favor seleccioná tu nivel de experiencia."); return; }

  document.getElementById("entSetup").style.display = "none";
  document.getElementById("entLoading").style.display = "block";

  const prompt = `Sos una entrevistadora de recursos humanos en Argentina. Generá ${entTotal} preguntas de entrevista laboral para alguien que aplica al puesto de "${entPuestoGuardado}" con ${entNivelGuardado}.

Las preguntas deben:
- Estar en español rioplatense (tuteo de "vos")
- Ser variadas: motivación, experiencia, situaciones hipotéticas, habilidades blandas
- Ser empáticas y no intimidantes
- Si no tiene experiencia, incluir preguntas sobre habilidades cotidianas

Respondé SOLO con un JSON array de strings, sin markdown ni texto extra. Ejemplo:
["¿Por qué te interesa este trabajo?", "Contanos sobre una situación difícil que hayas resuelto..."]`;

  try {
 const texto = await llamarIA(prompt);

console.log("Respuesta de Gemini:", texto);

try {
  const limpio = texto
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const inicio = limpio.indexOf("[");
  const fin = limpio.lastIndexOf("]");

  if (inicio === -1 || fin === -1) {
    throw new Error("No se encontró un array JSON válido.");
  }

  const json = limpio.substring(inicio, fin + 1);
  entPreguntas = JSON.parse(json);

} catch (e) {
  console.error("Respuesta recibida:", texto);
  throw e;
}

    document.getElementById("entLoading").style.display = "none";
    document.getElementById("entActiva").classList.remove("oculto");
    entMostrarPregunta(0);
  } catch (err) {
    console.error(err);
    document.getElementById("entLoading").style.display = "none";
    document.getElementById("entSetup").style.display = "block";
    alert("Error al generar las preguntas. Verificá tu API key e intentá de nuevo.");
  }
}

function entMostrarPregunta(idx) {
  const pct = (idx / entTotal) * 100;
  document.getElementById("entProgressBar").style.width = pct + "%";
  document.getElementById("entProgressText").textContent = `Pregunta ${idx + 1} de ${entTotal}`;

  const typing = document.getElementById("entTyping");
  const textoEl = document.getElementById("entPreguntaTexto");
  textoEl.textContent = "";
  typing.classList.remove("oculto");

  setTimeout(() => {
    typing.classList.add("oculto");
    entTypeText(textoEl, entPreguntas[idx]);
  }, 800);

  document.getElementById("entFeedback").classList.add("oculto");
  document.getElementById("entAnswerArea").style.display = "block";
  document.getElementById("entRespuesta").value = "";
}

function entTypeText(el, text) {
  let i = 0;
  el.textContent = "";
  const iv = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(iv);
  }, 18);
}

async function entResponder() {
  const respuesta = document.getElementById("entRespuesta").value.trim();
  if (!respuesta) { alert("Por favor escribí tu respuesta antes de continuar."); return; }

  entRespuestas.push({ pregunta: entPreguntas[entActualIdx], respuesta });

  const btn = document.getElementById("entBtnResponder");
  btn.disabled = true;
  btn.textContent = "Analizando...";

  const prompt = `Sos una entrevistadora de RRHH en Argentina, empática y constructiva. Evaluás a alguien con ${entNivelGuardado} que aplica a "${entPuestoGuardado}".

Pregunta: "${entPreguntas[entActualIdx]}"
Respuesta: "${respuesta}"

Dá feedback breve (máximo 4 líneas):
1. Destacá algo positivo de la respuesta
2. Sugerí cómo mejorarla
3. Usá tono amable en español rioplatense

Solo respondé con el texto, sin markdown ni títulos.`;

  try {
    const feedback = await llamarIA(prompt);
    entFeedbacks.push(feedback.trim());
    entMostrarFeedback(feedback.trim());
  } catch (err) {
    entFeedbacks.push("No se pudo obtener feedback.");
    entMostrarFeedback("No se pudo obtener feedback.");
  }

  btn.disabled = false;
  btn.textContent = "Enviar respuesta →";
}

function entMostrarFeedback(feedback) {
  document.getElementById("entAnswerArea").style.display = "none";
  document.getElementById("entFeedbackTexto").textContent = feedback;
  document.getElementById("entFeedback").classList.remove("oculto");

  const esUltima = entActualIdx === entTotal - 1;
  document.querySelector("#entFeedback .btn").textContent = esUltima ? "Ver mi evaluación →" : "Siguiente →";
}

function entSiguiente() {
  entActualIdx++;
  if (entActualIdx >= entTotal) {
    entMostrarFinal();
  } else {
    document.getElementById("entFeedback").classList.add("oculto");
    document.getElementById("entAnswerArea").style.display = "block";
    entMostrarPregunta(entActualIdx);
  }
}

async function entMostrarFinal() {
  document.getElementById("entActiva").classList.add("oculto");
  document.getElementById("entLoading").style.display = "block";
  document.getElementById("entLoadingText").textContent = "Analizando tu desempeño...";

  const historial = entRespuestas.map((r, i) =>
    `P${i+1}: "${r.pregunta}" → R: "${r.respuesta}"`
  ).join("\n");

  const prompt = `Evaluá el desempeño en una simulación de entrevista para "${entPuestoGuardado}" con ${entNivelGuardado}.

Historial:
${historial}

Respondé SOLO con este JSON, sin markdown ni texto extra:
{
  "puntuacion": "emoji o palabra que resuma el desempeño (ej: ⭐⭐⭐, Muy bien, En progreso)",
  "resumen": "2-3 oraciones empáticas sobre el desempeño en español rioplatense",
  "tips": ["tip concreto 1", "tip concreto 2", "tip concreto 3"]
}`;

  try {
    const texto = await llamarIA(prompt);
    const regexJSON = /\{[\s\S]*\}/;
    const coincidencia = texto.match(regexJSON);
    const jsonFinal = coincidencia ? coincidencia[0] : texto.replace(/```json|```/g, "").trim();
    
    const ev = JSON.parse(jsonFinal);

    document.getElementById("entLoading").style.display = "none";
    document.getElementById("entScore").textContent = ev.puntuacion;
    document.getElementById("entFinalFeedback").textContent = ev.resumen;

    if (ev.tips?.length) {
      document.getElementById("entFinalTips").innerHTML = `
        <div class="ent-final-feedback">
          <strong>💡 Para tu próxima entrevista:</strong><br><br>
          ${ev.tips.map(t => `→ ${t}`).join("<br>")}
        </div>`;
    }

    document.getElementById("entFinal").classList.remove("oculto");
  } catch (err) {
    document.getElementById("entLoading").style.display = "none";
    document.getElementById("entScore").textContent = "✓ Completada";
    document.getElementById("entFinalFeedback").textContent = "¡Completaste la simulación! Cada práctica te hace mejor.";
    document.getElementById("entFinal").classList.remove("oculto");
  }
}

function entVerHistorial() {
  const wrap = document.getElementById("entHistorialWrap");
  wrap.classList.toggle("oculto");
  if (!wrap.classList.contains("oculto")) {
    wrap.innerHTML = entRespuestas.map((r, i) => `
      <div class="ent-historial-item">
        <div class="ent-historial-pregunta">Pregunta ${i+1}: ${r.pregunta}</div>
        <div class="ent-historial-respuesta">${r.respuesta}</div>
      </div>
    `).join("");
  }
}

function entReiniciar() { abrirHerramienta("entrevista"); }

function initDetector() {}

function detCargarEjemplo(tipo) {
  const ejemplos = {
    falsa: `URGENTE!!! Trabajo desde casa, sin experiencia, ganás $500.000 por semana solo 2hs por día. No necesitás título ni CV. Solo mandanos tus datos personales y número de cuenta para registrarte. Inversión inicial mínima de $5000. WhatsApp: +54 9 11 XXXX-XXXX. ¡Cupos limitados! No pierdas esta oportunidad única.`,
    real: `Empresa de logística busca repositores para depósito en Quilmes. Turno mañana de 7 a 15hs. Requisitos: secundaria completa, disponibilidad para trabajar en equipo. Ofrecemos: sueldo según convenio + plus por asistencia + obra social + comedor en planta. Presentarse con CV en Av. Mitre 1234, Quilmes, de lunes a viernes de 9 a 13hs. Preguntar por Recursos Humanos.`
  };
  document.getElementById("detOferta").value = ejemplos[tipo];
}

async function detAnalizar() {
  const oferta = document.getElementById("detOferta").value.trim();
  if (!oferta) { alert("Por favor pegá el texto de la oferta para analizarla."); return; }

  document.getElementById("detForm").style.display = "none";
  document.getElementById("detLoading").style.display = "block";

  const prompt = `Sos un experto en seguridad laboral en Argentina. Analizá esta oferta de trabajo y determiná si es legítima, sospechosa o falsa/estafa.

Oferta:
"${oferta}"

Señales de alerta a buscar: promesas de dinero fácil o rápido, pedido de datos bancarios, inversión inicial requerida, urgencia exagerada, falta de datos de la empresa, trabajo desde casa sin requisitos, sueldos irreales, contacto solo por WhatsApp sin datos formales.

Respondé SOLO con este JSON, sin markdown ni texto extra:
{
  "veredicto": "SEGURA" o "SOSPECHOSA" o "PROBABLEMENTE FALSA",
  "puntaje_riesgo": número del 0 al 100,
  "señales": [
    {"tipo": "positiva", "texto": "descripción"},
    {"tipo": "negativa", "texto": "descripción"}
  ],
  "consejo": "recomendación concreta en español rioplatense"
}`;

  try {
    const texto = await llamarIA(prompt);
    const regexJSON = /\{[\s\S]*\}/;
    const coincidencia = texto.match(regexJSON);
    const jsonFinal = coincidencia ? coincidencia[0] : texto.replace(/```json|```/g, "").trim();

    const resultado = JSON.parse(jsonFinal);
    document.getElementById("detLoading").style.display = "none";
    detMostrarResultado(resultado);
  } catch (err) {
    console.error(err);
    document.getElementById("detLoading").style.display = "none";
    document.getElementById("detForm").style.display = "block";
    alert("Error al analizar la oferta. Verificá tu API key e intentá de nuevo.");
  }
}

function detMostrarResultado(r) {
  let colorClass = "verde";
  let emoji = "✅";
  if (r.veredicto === "SOSPECHOSA") { colorClass = "amarillo"; emoji = "⚠️"; }
  if (r.veredicto === "PROBABLEMENTE FALSA") { colorClass = "rojo"; emoji = "🚨"; }

  const veredictoEl = document.getElementById("detVeredicto");
  veredictoEl.textContent = `${emoji} ${r.veredicto}`;
  veredictoEl.className = `det-veredicto ${colorClass}`;

  const pct = Math.min(100, Math.max(0, r.puntaje_riesgo));
  const bar = document.getElementById("detScoreBar");
  bar.style.width = pct + "%";
  bar.className = `det-score-bar ${colorClass}`;
  document.getElementById("detScoreLabel").textContent = `Riesgo: ${pct}%`;

  if (r.señales?.length) {
    document.getElementById("detSeñales").innerHTML = `
      <p class="det-señales-title">Señales detectadas</p>
      ${r.señales.map(s => `
        <div class="det-señal-item">
          <span class="icon">${s.tipo === "positiva" ? "✅" : "⚠️"}</span>
          <span>${s.texto}</span>
        </div>
      `).join("")}
    `;
  }

  document.getElementById("detConsejo").innerHTML =
    `<div class="det-consejo ${colorClass}"><strong>💬 Consejo:</strong> ${r.consejo}</div>`;

  document.getElementById("detResultado").classList.remove("oculto");
}

function detReiniciar() { abrirHerramienta("detector"); }
