// TEST "ENCONTRÁ TU OPORTUNIDAD"

document.getElementById("quizForm")
.addEventListener("submit", function(e) {

  e.preventDefault();

  const experiencia =
    document.getElementById("experiencia").value;

  const discapacidad =
    document.getElementById("discapacidad").value;
  
document.getElementById("res-sin-si").classList.add("oculto");
document.getElementById("res-sin-no").classList.add("oculto");
document.getElementById("res-con").classList.add("oculto");
  // Mostrar resultado correcto
  if (experiencia === "sin" && discapacidad === "si") {
document.getElementById("res-sin-si").classList.remove("oculto");

  } else if (
    experiencia === "sin" &&
    discapacidad === "no"
  ) {
document.getElementById("res-sin-no").classList.remove("oculto");

  } else if (experiencia === "con") {
  document.getElementById("res-con").classList.remove("oculto");
  }
});

// COMENTARIOS
document.getElementById("comentarioForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const comentario = document.getElementById("comentario").value;
  const nuevoComentario = document.createElement("div");

  nuevoComentario.classList.add("comentario");
  nuevoComentario.innerHTML = `
    <h4>${nombre}</h4>
    <p>${comentario}</p>
  `;

  document.getElementById("comentariosLista").appendChild(nuevoComentario);
  this.reset();
});

// --- LÓGICA DE RESEÑAS Y BÚSQUEDA ---
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

// Lógica para agregar nueva reseña desde un formulario
const addReviewForm = document.getElementById("addReviewForm");
if (addReviewForm) {
  addReviewForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newReview = {
      empresa: document.getElementById("newEmpresa").value,
      puesto: document.getElementById("newPuesto").value,
      calificacion: document.getElementById("newRating").value,
      comentario: document.getElementById("newComentario").value,
      link: "#"
    };
    reviewsData.push(newReview);
    renderReviews();
    addReviewForm.reset();
    alert("¡Reseña agregada con éxito!");
  });
}

// Buscador
document.getElementById("searchReviews").addEventListener("input", (e) => renderReviews(e.target.value));

// Render inicial
renderReviews();

// FORO DE EMPLEO
const foroForm = document.getElementById("foroForm");
foroForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const titulo = document.getElementById("tituloAviso").value;
  const detalle = document.getElementById("detalleAviso").value;
  
  const div = document.createElement("div");
  div.className = "card"; // Aprovechamos tu estilo CSS de tarjetas
  div.innerHTML = `
  <h4>${titulo}</h4>
  <p>${detalle}</p>
`;
  
  document.getElementById("listaAvisos").appendChild(div);
  foroForm.reset();
});

// REGISTRO VOLUNTARIO
const voluntarioForm = document.getElementById("voluntarioForm");
voluntarioForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombreVol").value;
 alert("¡Gracias por sumarte, " + nombre + "! Nos pondremos en contacto pronto.");
  voluntarioForm.reset();
});
