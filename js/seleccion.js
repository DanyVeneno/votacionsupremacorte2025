// Variable global para almacenar selecciones
let selectedCandidates = new Set();

// Función para determinar la clase CSS basada en el poder postulante
function getPowerClass(poder) {
  if (poder.includes("Poder Judicial")) return "poder-judicial";
  if (poder.includes("Poder Ejecutivo")) return "poder-ejecutivo";
  if (poder.includes("Poder Legislativo")) return "poder-legislativo";
  if (poder.includes("En Funciones")) return "en-funciones";
  if (poder.includes(",")) return "multiple-poderes";
  return "poder-judicial";
}

// Función para crear una tarjeta de candidato (VERSIÓN CORREGIDA)
function createCandidateCard(candidate) {
  const powerClass = getPowerClass(candidate.PODER_POSTULA);
  const isSelected = selectedCandidates.has(candidate.NUM_LISTA_EN_BOLETA);

  const card = document.createElement("div");
  card.className = `candidate-card ${powerClass} ${
    isSelected ? "selected" : ""
  }`;
  card.innerHTML = `
        <div class="candidate-name">
            ${candidate.NOMBRE_CANDIDATO}
            <span class="list-number">${candidate.NUM_LISTA_EN_BOLETA}</span>
        </div>
        <div class="candidate-position">${candidate.CARGO}</div>
        <div class="candidate-info"><strong>Entidad:</strong> ${
          candidate.ENTIDAD
        }</div>
        <div class="candidate-info"><strong>Postulado por:</strong> ${
          candidate.PODER_POSTULA
        }</div>
        <div class="candidate-info"><strong>Sexo:</strong> ${
          candidate.SEXO
        }</div>
        <div class="candidate-info"><strong>Escolaridad:</strong> ${
          candidate.ESCOLARIDAD
        }</div>
        <div class="candidate-info"><strong>Teléfono:</strong> ${
          candidate.TELEFONO
        }</div>
        <div class="candidate-info"><strong>Email:</strong> ${
          candidate.CORREO_ELECTRONICO
        }</div>
        
        <div class="select-container">
            <label>
                <input type="checkbox" class="candidate-select" 
                       data-id="${candidate.NUM_LISTA_EN_BOLETA}"
                       ${isSelected ? "checked" : ""}>
                Seleccionar
            </label>
        </div>
    `;
  return card;
}

// Resto del código permanece igual...
// Función para filtrar candidatos por color (poder postulante)
function filterByColor(colorClass) {
  if (colorClass === "all") {
    renderCandidates();
    return;
  }

  const filtered = candidates.filter((candidate) => {
    if (candidate.ESTATUS !== "Publicado") return false;

    const powerClass = getPowerClass(candidate.PODER_POSTULA);
    return powerClass === colorClass;
  });

  renderCandidates(filtered);
}
