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

  const wrap = document.getElementById("testResultadosWrap");
  wrap.classList.remove("oculto");
  wrap.scrollIntoView?.({ behavior: "smooth", block: "nearest" });
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
  marcarMision("postulo");
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
  if (tipo === "habilidades") initHabilidades();
  if (tipo === "predictor") initPredictor();
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
    guardarPerfil(datos, cvData);
    marcarMision("perfil");
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

/* =========================================================
   PERFIL (compartido entre CV, Predictor y Misiones)
========================================================= */
function guardarPerfil(datos, cvData) {
  const perfil = {
    nombre: datos.nombre,
    email: datos.email,
    puesto: datos.puesto,
    experiencia: datos.experiencia,
    educacion: datos.educacion,
    cursos: datos.cursos,
    habilidades: [...new Set([...(cvData.habilidades || []), ...datos.habilidades.split(",").map(h => h.trim()).filter(Boolean)])],
    idiomas: datos.idiomas,
    disponibilidad: datos.disponibilidad,
    objetivo: datos.objetivo
  };
  localStorage.setItem("suma_perfil", JSON.stringify(perfil));
}

function obtenerPerfil() {
  try {
    return JSON.parse(localStorage.getItem("suma_perfil"));
  } catch (e) {
    return null;
  }
}

/* =========================================================
   DETECTOR DE HABILIDADES OCULTAS
========================================================= */
function initHabilidades() {}

function habCargarEjemplo() {
  document.getElementById("habTexto").value =
    "Cuido a mis dos hijos todos los días, cocino para toda la familia (a veces para 10 personas cuando vienen mis suegros), organizo las reuniones del club de barrio, llevo las cuentas de la casa y ayudo a mis vecinas mayores con trámites del banco y turnos médicos.";
}

async function habAnalizar() {
  const texto = document.getElementById("habTexto").value.trim();
  if (!texto) { alert("Por favor contanos un poco sobre tu día a día."); return; }

  document.getElementById("habForm").style.display = "none";
  document.getElementById("habLoading").style.display = "block";

  const prompt = `Sos un especialista en recursos humanos en Argentina, experto en detectar habilidades transferibles en personas sin experiencia laboral formal (amas de casa, cuidadoras, vecinas activas, etc).

La persona describió así su día a día:
"${texto}"

Traducí esas tareas cotidianas en habilidades laborales reales y concretas, y sugerí puestos de trabajo donde esas habilidades sirven.

Respondé SOLO con este JSON, sin markdown ni texto extra:
{
  "habilidades": ["habilidad laboral 1", "habilidad laboral 2", "..."],
  "puestos": [
    {"puesto": "nombre del puesto", "porque": "1 oración explicando por qué esa persona serviría para ese puesto según lo que contó"}
  ],
  "frases_cv": ["frase profesional lista para copiar en un CV, basada en una tarea cotidiana mencionada", "otra frase"]
}

Usá español rioplatense, tono cercano y profesional. Generá entre 5 y 8 habilidades, entre 3 y 5 puestos, y entre 3 y 4 frases para CV.`;

  try {
    const texto2 = await llamarIA(prompt);
    const regexJSON = /\{[\s\S]*\}/;
    const coincidencia = texto2.match(regexJSON);
    const jsonFinal = coincidencia ? coincidencia[0] : texto2.replace(/```json|```/g, "").trim();
    const resultado = JSON.parse(jsonFinal);
    document.getElementById("habLoading").style.display = "none";
    habMostrarResultado(resultado);
  } catch (err) {
    console.error(err);
    document.getElementById("habLoading").style.display = "none";
    document.getElementById("habForm").style.display = "block";
    alert("Hubo un error al analizar tus habilidades. Verificá tu API key e intentá de nuevo.");
  }
}

let habUltimoResultado = null;

function habMostrarResultado(r) {
  habUltimoResultado = r;

  document.getElementById("habHabilidadesTags").innerHTML =
    (r.habilidades || []).map(h => `<span class="cv-tag">${h}</span>`).join("");

  document.getElementById("habPuestos").innerHTML =
    (r.puestos || []).map(p => `
      <div class="hab-puesto-item">
        <strong>${p.puesto}</strong>
        <p>${p.porque}</p>
      </div>
    `).join("");

  document.getElementById("habFrasesCV").innerHTML =
    (r.frases_cv || []).map(f => `<div class="hab-frase-item">"${f}"</div>`).join("");

  document.getElementById("habResultado").classList.remove("oculto");
}

function habUsarEnCV() {
  cerrarHerramienta();
  abrirHerramienta("cv");
  if (habUltimoResultado?.habilidades?.length) {
    setTimeout(() => {
      document.getElementById("cvHabilidadesExtra").value = habUltimoResultado.habilidades.join(", ");
    }, 100);
  }
}

function habReiniciar() { abrirHerramienta("habilidades"); }

/* =========================================================
   PANEL DE ONGs Y VOLUNTARIADOS
========================================================= */
// Todo vive en localStorage (el navegador de cada persona), así que carga
// siempre al instante, sin depender de ningún servidor externo.
const ONG_STORAGE_KEY = "suma_oportunidades_v2";

function ongObtenerOportunidades() {
  try {
    return JSON.parse(localStorage.getItem(ONG_STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function ongGuardarOportunidades(lista) {
  try {
    localStorage.setItem(ONG_STORAGE_KEY, JSON.stringify(lista));
  } catch (e) {
    console.error("No se pudo guardar la oportunidad:", e);
  }
}

// Datos de ejemplo, solo se cargan la primera vez (para que el panel no se vea vacío)
if (!localStorage.getItem(ONG_STORAGE_KEY)) {
  ongGuardarOportunidades([
    {
      id: "demo1",
      ong: "TECHO Argentina",
      titulo: "Voluntariado en asentamientos populares",
      ubicacion: "Todo el país",
      vacantes: 10,
      descripcion: "Sumate a las actividades de fin de semana en barrios populares: construcción de viviendas de emergencia, apoyo escolar y trabajo comunitario junto a las familias.",
      enlace: "https://argentina.techo.org/voluntariado/",
      vistas: 0,
      clics: 0,
      fecha: new Date().toISOString()
    },
    {
      id: "demo2",
      ong: "Cruz Roja Argentina",
      titulo: "Voluntariado en tu filial local",
      ubicacion: "Filiales en todo el país",
      vacantes: 15,
      descripcion: "Participá en actividades de gestión del riesgo, promoción de la salud y primeros auxilios. Mayores de 16 años, no se requiere experiencia previa.",
      enlace: "https://www.cruzroja.org.ar/voluntariado/",
      vistas: 0,
      clics: 0,
      fecha: new Date().toISOString()
    },
    {
      id: "demo3",
      ong: "Cáritas Argentina",
      titulo: "Voluntariado parroquial y comunitario",
      ubicacion: "Más de 3.500 parroquias en el país",
      vacantes: 20,
      descripcion: "Sumate a un equipo local para acompañar a personas y familias en situación de vulnerabilidad. No se necesita experiencia previa.",
      enlace: "https://caritas.org.ar/voluntariado/",
      vistas: 0,
      clics: 0,
      fecha: new Date().toISOString()
    }
  ]);
}

function ongCambiarTab(tab) {
  document.querySelectorAll(".ong-tab-btn").forEach(b => b.classList.toggle("active", b.dataset.tab === tab));
  document.getElementById("ongTabPublicas").classList.toggle("oculto", tab !== "publicas");
  document.getElementById("ongTabPublicar").classList.toggle("oculto", tab !== "publicar");
  document.getElementById("ongTabPanel").classList.toggle("oculto", tab !== "panel");

  if (tab === "publicas") ongRenderListaPublica();
  if (tab === "panel") ongPoblarSelector();
}

function ongRenderListaPublica() {
  const lista = ongObtenerOportunidades();
  // Simula "alcance": cada vez que se muestra la lista, suman vistas (métrica de impresiones)
  lista.forEach(o => o.vistas = (o.vistas || 0) + 1);
  ongGuardarOportunidades(lista);

  const cont = document.getElementById("ongListaPublica");
  if (!lista.length) {
    cont.innerHTML = "<p>Todavía no hay voluntariados publicados. ¡Sé la primera organización en sumar una oportunidad!</p>";
    return;
  }

  cont.innerHTML = lista.map(o => `
    <div class="ong-oportunidad-card">
      <div class="ong-oportunidad-header">
        <div>
          <h4>${o.titulo}</h4>
          <div class="ong-oportunidad-meta">${o.ong} · ${o.ubicacion}</div>
        </div>
      </div>
      <p>${o.descripcion}</p>
      <div class="ong-oportunidad-footer">
        <span class="ong-vistas">👁 ${o.vistas} vistas · ${o.clics || 0} interesados · ${o.vacantes} vacante(s)</span>
        <button class="btn" onclick="ongIrAPostular('${o.id}')">🤝 Postularme</button>
      </div>
    </div>
  `).join("");
}

function ongIrAPostular(id) {
  const lista = ongObtenerOportunidades();
  const oportunidad = lista.find(o => o.id === id);
  if (!oportunidad) return;

  if (!oportunidad.enlace) {
    alert("Esta organización todavía no cargó un link oficial de postulación.");
    return;
  }

  window.open(oportunidad.enlace, "_blank", "noopener,noreferrer");
  marcarMision("postulo");

  oportunidad.clics = (oportunidad.clics || 0) + 1;
  ongGuardarOportunidades(lista);
  ongRenderListaPublica();
}

document.getElementById("ongPublicarForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const nueva = {
    id: "ong_" + Date.now(),
    ong: document.getElementById("ongNombre").value.trim(),
    titulo: document.getElementById("ongTitulo").value.trim(),
    ubicacion: document.getElementById("ongUbicacion").value.trim(),
    vacantes: parseInt(document.getElementById("ongVacantes").value) || 1,
    descripcion: document.getElementById("ongDescripcion").value.trim(),
    enlace: document.getElementById("ongEnlace").value.trim(),
    vistas: 0,
    clics: 0,
    fecha: new Date().toISOString()
  };
  const lista = ongObtenerOportunidades();
  lista.unshift(nueva);
  ongGuardarOportunidades(lista);
  e.target.reset();
  alert("¡Tu oportunidad de voluntariado fue publicada con éxito!");
  ongCambiarTab("publicas");
});

function ongPoblarSelector() {
  const lista = ongObtenerOportunidades();
  const nombres = [...new Set(lista.map(o => o.ong))];
  const select = document.getElementById("ongSelectPropia");
  const seleccionActual = select.value;
  select.innerHTML = `<option value="">Seleccioná tu ONG...</option>` +
    nombres.map(n => `<option value="${n}">${n}</option>`).join("");
  if (nombres.includes(seleccionActual)) select.value = seleccionActual;
  ongRenderPanel();
}

function ongRenderPanel() {
  const nombreOng = document.getElementById("ongSelectPropia").value;
  const cont = document.getElementById("ongPanelMetricas");
  if (!nombreOng) { cont.innerHTML = ""; return; }

  const lista = ongObtenerOportunidades().filter(o => o.ong === nombreOng);
  const totalVistas = lista.reduce((acc, o) => acc + (o.vistas || 0), 0);
  const totalClics = lista.reduce((acc, o) => acc + (o.clics || 0), 0);

  cont.innerHTML = `
    <div class="ong-metricas-resumen">
      <div class="ong-metrica-box"><div class="num">${lista.length}</div><div class="label">Oportunidades</div></div>
      <div class="ong-metrica-box"><div class="num">${totalVistas}</div><div class="label">Alcance (vistas)</div></div>
      <div class="ong-metrica-box"><div class="num">${totalClics}</div><div class="label">Clics en Postularme</div></div>
    </div>
    ${lista.map(o => `
      <div class="ong-oportunidad-card">
        <div class="ong-oportunidad-header">
          <div>
            <h4>${o.titulo}</h4>
            <div class="ong-oportunidad-meta">${o.ubicacion} · ${o.vacantes} vacante(s)</div>
          </div>
          <span class="ong-vistas">👁 ${o.vistas} vistas · 🤝 ${o.clics || 0} clics</span>
        </div>
        <p style="font-size:0.85rem;color:#6b7280;">Link oficial de postulación: <a href="${o.enlace}" target="_blank">${o.enlace}</a></p>
      </div>
    `).join("")}
  `;
}

// Renderiza la lista pública apenas carga la página, ya que el tab "publicas" está activo por defecto
if (document.getElementById("ongListaPublica")) {
  ongRenderListaPublica();
}

/* =========================================================
   MISIONES SEMANALES + CELEBRACIÓN CON APLAUSOS
========================================================= */
function getSemanaActual() {
  const ahora = new Date();
  const inicioAño = new Date(ahora.getFullYear(), 0, 1);
  const dias = Math.floor((ahora - inicioAño) / 86400000);
  const semana = Math.ceil((dias + inicioAño.getDay() + 1) / 7);
  return `${ahora.getFullYear()}-W${semana}`;
}

function obtenerMisiones() {
  let m;
  try {
    m = JSON.parse(localStorage.getItem("suma_misiones"));
  } catch (e) {
    m = null;
  }
  const semanaActual = getSemanaActual();
  if (!m || m.semana !== semanaActual) {
    m = { semana: semanaActual, perfil: false, postulo: false, celebrado: false };
    localStorage.setItem("suma_misiones", JSON.stringify(m));
  }
  return m;
}

function guardarMisiones(m) {
  localStorage.setItem("suma_misiones", JSON.stringify(m));
}

function marcarMision(tipo) {
  const m = obtenerMisiones();
  m[tipo] = true;
  guardarMisiones(m);
  renderMisionWidget();
  if (m.perfil && m.postulo && !m.celebrado) {
    m.celebrado = true;
    guardarMisiones(m);
    celebrarMisionCumplida();
  }
}

function renderMisionWidget() {
  const m = obtenerMisiones();
  const itemPerfil = document.getElementById("misionItemPerfil");
  const itemPostulo = document.getElementById("misionItemPostulo");
  if (!itemPerfil || !itemPostulo) return;

  itemPerfil.querySelector(".mision-check").textContent = m.perfil ? "✅" : "⬜";
  itemPostulo.querySelector(".mision-check").textContent = m.postulo ? "✅" : "⬜";

  const estado = document.getElementById("misionEstadoTexto");
  if (m.perfil && m.postulo) {
    estado.textContent = "🎉 ¡Misión de la semana cumplida!";
  } else if (m.perfil || m.postulo) {
    estado.textContent = "¡Ya vas por la mitad, seguí así! 💪";
  } else {
    estado.textContent = "¡Vamos que se puede! 💪";
  }
}

function misionToggleWidget() {
  document.getElementById("misionPanel").classList.toggle("oculto");
}

function resetMisionSemana() {
  const semanaActual = getSemanaActual();
  const m = { semana: semanaActual, perfil: false, postulo: false, celebrado: false };
  guardarMisiones(m);
  renderMisionWidget();
}

function celebrarMisionCumplida() {
  document.getElementById("misionPanel").classList.remove("oculto");
  lanzarConfetti();
  reproducirAplausos();
}

function lanzarConfetti() {
  const cont = document.getElementById("confettiContainer");
  const emojis = ["🎉", "🎊", "✨", "🏆", "👏"];
  for (let i = 0; i < 28; i++) {
    const pieza = document.createElement("span");
    pieza.className = "confetti-pieza";
    pieza.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    pieza.style.left = Math.random() * 100 + "vw";
    pieza.style.fontSize = (1 + Math.random() * 1.2) + "rem";
    pieza.style.animationDuration = (1.8 + Math.random() * 1.2) + "s";
    pieza.style.animationDelay = (Math.random() * 0.5) + "s";
    cont.appendChild(pieza);
    setTimeout(() => pieza.remove(), 3500);
  }
}

let audioAplausos = null;
let aplausosRespaldoUsado = false;

// Intenta reproducir un archivo de audio real (audio/aplausos.mp3) si existe en el proyecto.
// Si el archivo no existe, no cargó, o el navegador bloquea la reproducción,
// cae automáticamente al aplauso sintetizado (siempre suena algo).
function reproducirAplausos() {
  aplausosRespaldoUsado = false;

  const usarRespaldo = () => {
    if (aplausosRespaldoUsado) return;
    aplausosRespaldoUsado = true;
    reproducirAplausosSintetizados();
  };

  try {
    if (!audioAplausos) {
      audioAplausos = new Audio("audio/aplausos.mp3");
      audioAplausos.preload = "auto";
      audioAplausos.volume = 0.55;
      audioAplausos.addEventListener("error", usarRespaldo);
    }

    audioAplausos.pause();
    audioAplausos.currentTime = 0;

    const promesa = audioAplausos.play();
    if (promesa && typeof promesa.catch === "function") {
      promesa.catch(usarRespaldo);
    }

    // Si a los 300ms no arrancó a sonar de verdad (readyState bajo), usamos el respaldo.
    setTimeout(() => {
      if (audioAplausos.paused || audioAplausos.readyState < 2) usarRespaldo();
    }, 300);

    // Se corta después de 2.8 segundos
    setTimeout(() => {
      audioAplausos.pause();
      audioAplausos.currentTime = 0;
    }, 2800);
  } catch (e) {
    usarRespaldo();
  }
}

// Genera un sonido corto y natural de "aplauso de felicitaciones" (unas pocas palmadas, sin archivo de audio)
function reproducirAplausosSintetizados() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioCtx();
    const ahora = ctx.currentTime;

    const cantidadPalmas = 5;
    let t = ahora + 0.03;

    for (let i = 0; i < cantidadPalmas; i++) {
      reproducirUnaPalmada(ctx, t);
      t += 0.1 + Math.random() * 0.05; // ritmo natural de palmadas, no una multitud
    }
  } catch (e) {
    console.warn("No se pudo reproducir el sonido de aplausos:", e);
  }
}

function reproducirUnaPalmada(ctx, t) {
  const duracion = 0.07 + Math.random() * 0.02;
  const bufferSize = Math.floor(ctx.sampleRate * duracion);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let j = 0; j < bufferSize; j++) {
    // envolvente suave (no exponencial pura) para evitar el efecto "pop"/globo
    const progreso = j / bufferSize;
    const envolvente = Math.pow(1 - progreso, 2.2);
    data[j] = (Math.random() * 2 - 1) * envolvente;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  // Un solo filtro, ancho y con poca resonancia: así se escucha a palmada seca, no a tono/pop
  const filtro = ctx.createBiquadFilter();
  filtro.type = "bandpass";
  filtro.frequency.value = 1100 + Math.random() * 700;
  filtro.Q.value = 0.5;

  const pasaBajos = ctx.createBiquadFilter();
  pasaBajos.type = "lowpass";
  pasaBajos.frequency.value = 3800;

  const ganancia = ctx.createGain();
  ganancia.gain.value = 0.5 + Math.random() * 0.2;

  source.connect(filtro);
  filtro.connect(pasaBajos);
  pasaBajos.connect(ganancia);
  ganancia.connect(ctx.destination);
  source.start(t);
}

/* =========================================================
   PREDICTOR DE EMPLEABILIDAD
========================================================= */
function initPredictor() {
  const perfil = obtenerPerfil();
  document.getElementById("predSinPerfil").classList.toggle("oculto", !!perfil);
  document.getElementById("predConPerfil").classList.toggle("oculto", !perfil);
}

async function predictorAnalizar() {
  let perfilTexto;
  const perfil = obtenerPerfil();

  if (perfil) {
    perfilTexto = `Puesto de interés: ${perfil.puesto || "no especificado"}
Experiencia / día a día: ${perfil.experiencia || "no especificada"}
Educación: ${perfil.educacion || "no especificada"}
Cursos: ${perfil.cursos || "ninguno"}
Habilidades: ${(perfil.habilidades || []).join(", ") || "no especificadas"}
Idiomas: ${perfil.idiomas || "Español"}
Disponibilidad: ${perfil.disponibilidad || "no especificada"}`;
  } else {
    const puesto = document.getElementById("predPuesto").value.trim();
    const experiencia = document.getElementById("predExperiencia").value.trim();
    if (!puesto || !experiencia) { alert("Por favor completá el puesto y tu experiencia."); return; }
    perfilTexto = `Puesto de interés: ${puesto}\nExperiencia / día a día: ${experiencia}`;
  }

  document.getElementById("predForm").style.display = "none";
  document.getElementById("predLoading").style.display = "block";

  const prompt = `Sos un especialista en empleabilidad en Argentina. Con el siguiente perfil de una persona, evaluá qué tan cerca está de conseguir distintos tipos de trabajo posibles (incluyendo el puesto que busca y 2 o 3 alternativas razonables según su perfil).

Perfil:
${perfilTexto}

Para cada tipo de trabajo, calculá un porcentaje realista (0-100) de qué tan preparada está esa persona hoy, y qué le faltaría concretamente para acercarse al 100%.

Respondé SOLO con este JSON, sin markdown ni texto extra:
{
  "resultados": [
    {
      "puesto": "nombre del puesto",
      "porcentaje": número del 0 al 100,
      "falta": ["cosa concreta que le falta 1", "cosa concreta 2", "cosa concreta 3"]
    }
  ]
}

Generá entre 3 y 4 resultados. Sé realista pero alentador, en español rioplatense.`;

  try {
    const texto = await llamarIA(prompt);
    const regexJSON = /\{[\s\S]*\}/;
    const coincidencia = texto.match(regexJSON);
    const jsonFinal = coincidencia ? coincidencia[0] : texto.replace(/```json|```/g, "").trim();
    const resultado = JSON.parse(jsonFinal);
    document.getElementById("predLoading").style.display = "none";
    predictorMostrarResultado(resultado);
  } catch (err) {
    console.error(err);
    document.getElementById("predLoading").style.display = "none";
    document.getElementById("predForm").style.display = "block";
    alert("Hubo un error al calcular tu empleabilidad. Verificá tu API key e intentá de nuevo.");
  }
}

function predictorMostrarResultado(r) {
  const lista = r.resultados || [];
  document.getElementById("predLista").innerHTML = lista.map(item => `
    <div class="pred-item">
      <div class="pred-item-header">
        <strong>${item.puesto}</strong>
        <span class="pred-pct">${item.porcentaje}%</span>
      </div>
      <div class="pred-bar-bg"><div class="pred-bar" style="width:${item.porcentaje}%"></div></div>
      <div class="pred-falta-title">Para acercarte al 100% te falta:</div>
      ${(item.falta || []).map(f => `<div class="pred-falta-item">${f}</div>`).join("")}
    </div>
  `).join("");
  document.getElementById("predResultado").classList.remove("oculto");
}

function predictorReiniciar() { abrirHerramienta("predictor"); }

ongRenderListaPublica();
renderMisionWidget();
