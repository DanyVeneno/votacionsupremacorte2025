// // Función para determinar la clase CSS basada en el poder postulante
// function getPowerClass(poder) {
//     if (poder.includes("Poder Judicial")) return "poder-judicial";
//     if (poder.includes("Poder Ejecutivo")) return "poder-ejecutivo";
//     if (poder.includes("Poder Legislativo")) return "poder-legislativo";
//     if (poder.includes("En Funciones")) return "en-funciones";
//     if (poder.includes(",")) return "multiple-poderes";
//     return "poder-judicial";
// }

// // Función para crear una tarjeta de candidato
// function createCandidateCard(candidate) {
//     const powerClass = getPowerClass(candidate.PODER_POSTULA);

//     const card = document.createElement('div');
//     card.className = `candidate-card ${powerClass}`;
//     card.innerHTML = `
//         <div class="candidate-name">
//             ${candidate.NOMBRE_CANDIDATO}
//             <span class="list-number">${candidate.NUM_LISTA_EN_BOLETA}</span>
//         </div>
//         <div class="candidate-position">${candidate.CARGO}</div>
//         <div class="candidate-info"><strong>Entidad:</strong> ${candidate.ENTIDAD}</div>
//         <div class="candidate-info"><strong>Postulado por:</strong> ${candidate.PODER_POSTULA}</div>
//         <div class="candidate-info"><strong>Sexo:</strong> ${candidate.SEXO}</div>
//         <div class="candidate-info"><strong>Escolaridad:</strong> ${candidate.ESCOLARIDAD}</div>
//         <div class="candidate-info"><strong>Teléfono:</strong> ${candidate.TELEFONO}</div>
//         <div class="candidate-info"><strong>Email:</strong> ${candidate.CORREO_ELECTRONICO}</div>

//         <div class="select-container">
//             <label>
//                 <input type="checkbox" class="candidate-select" data-id="${candidate.NUM_LISTA_EN_BOLETA}">
//                 Seleccionar
//             </label>
//         </div>
//     `;
//     return card;
// }

// // Función para renderizar todas las tarjetas de candidatos
// function renderCandidates(candidatesToRender = candidates) {
//     const container = document.getElementById('candidates-container');
//     container.innerHTML = '';

//     if (candidatesToRender.length === 0) {
//         container.innerHTML = '<div class="no-candidates">No se encontraron candidatos que coincidan con el filtro.</div>';
//         return;
//     }

//     candidatesToRender.forEach(candidate => {
//         if (candidate.ESTATUS === "Publicado") {
//             container.appendChild(createCandidateCard(candidate));
//         }
//     });
// }

// // Función para llenar el filtro de entidades
// function populateEntityFilter() {
//     const filter = document.getElementById('entity-filter');
//     const entities = new Set();

//     candidates.forEach(candidate => {
//         if (candidate.ENTIDAD && candidate.ESTATUS === "Publicado") {
//             entities.add(candidate.ENTIDAD);
//         }
//     });

//     Array.from(entities).sort().forEach(entity => {
//         const option = document.createElement('option');
//         option.value = entity;
//         option.textContent = entity;
//         filter.appendChild(option);
//     });
// }

// // Función para filtrar candidatos por entidad
// function filterByEntity(entity) {
//     if (entity === 'all') {
//         renderCandidates();
//         return;
//     }

//     const filtered = candidates.filter(candidate =>
//         candidate.ENTIDAD === entity && candidate.ESTATUS === "Publicado"
//     );
//     renderCandidates(filtered);
// }

// // Función para descargar los candidatos seleccionados como PDF
// async function downloadSelectedAsPDF() {
//     const { jsPDF } = window.jspdf;
//     const doc = new jsPDF();
//     const selectedCheckboxes = document.querySelectorAll('.candidate-select:checked');

//     if (selectedCheckboxes.length === 0) {
//         alert('Por favor selecciona al menos un candidato para descargar.');
//         return;
//     }

//     const tempContainer = document.createElement('div');
//     tempContainer.style.position = 'absolute';
//     tempContainer.style.left = '-9999px';
//     tempContainer.style.width = '800px';
//     document.body.appendChild(tempContainer);

//     const title = document.createElement('h1');
//     title.textContent = 'Candidatos Seleccionados a la Suprema Corte de Justicia';
//     title.style.textAlign = 'center';
//     title.style.marginBottom = '20px';
//     tempContainer.appendChild(title);

//     selectedCheckboxes.forEach(checkbox => {
//         const candidateId = checkbox.getAttribute('data-id');
//         const candidate = candidates.find(c => c.NUM_LISTA_EN_BOLETA === candidateId);
//         if (candidate) {
//             const card = createCandidateCard(candidate);
//             card.style.marginBottom = '20px';
//             tempContainer.appendChild(card);
//         }
//     });

//     try {
//         const canvas = await html2canvas(tempContainer, {
//             scale: 2,
//             logging: false,
//             useCORS: true
//         });

//         const imgData = canvas.toDataURL('image/png');
//         doc.addImage(imgData, 'PNG', 10, 10, 190, 0);
//         doc.save('candidatos_seleccionados.pdf');
//     } catch (error) {
//         console.error('Error al generar PDF:', error);
//         alert('Ocurrió un error al generar el PDF. Por favor intenta nuevamente.');
//     } finally {
//         document.body.removeChild(tempContainer);
//     }
// }

// // Función para alternar el modo oscuro
// function toggleDarkMode() {
//     document.body.classList.toggle('dark-mode');
//     localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
// }

// // Inicializar la aplicación
// document.addEventListener('DOMContentLoaded', () => {
//     renderCandidates();
//     populateEntityFilter();

//     document.getElementById('entity-filter').addEventListener('change', (e) => {
//         filterByEntity(e.target.value);
//     });

//     document.getElementById('download-pdf').addEventListener('click', downloadSelectedAsPDF);

//     const darkModeToggle = document.getElementById('dark-mode-toggle');
//     darkModeToggle.addEventListener('change', toggleDarkMode);

//     if (localStorage.getItem('darkMode') === 'true') {
//         document.body.classList.add('dark-mode');
//         darkModeToggle.checked = true;
//     }
// });

// Función para determinar la clase CSS basada en el poder postulante
function getPowerClass(poder) {
  if (poder.includes("Poder Judicial")) return "poder-judicial";
  if (poder.includes("Poder Ejecutivo")) return "poder-ejecutivo";
  if (poder.includes("Poder Legislativo")) return "poder-legislativo";
  if (poder.includes("En Funciones")) return "en-funciones";
  if (poder.includes(",")) return "multiple-poderes";
  return "poder-judicial";
}

// Función para crear una tarjeta de candidato
function createCandidateCard(candidate) {
  const powerClass = getPowerClass(candidate.PODER_POSTULA);

  const card = document.createElement("div");
  card.className = `candidate-card ${powerClass}`;
  card.innerHTML = `
        <div class="candidate-name">
            ${candidate.NOMBRE_CANDIDATO}
            <span class="list-number">${candidate.NUM_LISTA_EN_BOLETA}</span>
        </div>
        <div class="candidate-position">${candidate.CARGO}</div>
        <div class="candidate-info"><strong>Entidad:</strong> ${candidate.ENTIDAD}</div>
        <div class="candidate-info"><strong>Postulado por:</strong> ${candidate.PODER_POSTULA}</div>
        <div class="candidate-info"><strong>Sexo:</strong> ${candidate.SEXO}</div>
        <div class="candidate-info"><strong>Escolaridad:</strong> ${candidate.ESCOLARIDAD}</div>
        <div class="candidate-info"><strong>Teléfono:</strong> ${candidate.TELEFONO}</div>
        <div class="candidate-info"><strong>Email:</strong> ${candidate.CORREO_ELECTRONICO}</div>
        
        <div class="select-container">
            <label>
                <input type="checkbox" class="candidate-select" data-id="${candidate.NUM_LISTA_EN_BOLETA}">
                Seleccionar
            </label>
        </div>
    `;
  return card;
}

// Función para renderizar todas las tarjetas de candidatos
function renderCandidates(candidatesToRender = candidates) {
  const container = document.getElementById("candidates-container");
  container.innerHTML = "";

  if (candidatesToRender.length === 0) {
    container.innerHTML =
      '<div class="no-candidates">No se encontraron candidatos que coincidan con el filtro.</div>';
    return;
  }

  candidatesToRender.forEach((candidate) => {
    if (candidate.ESTATUS === "Publicado") {
      container.appendChild(createCandidateCard(candidate));
    }
  });
}

// Función para llenar el filtro de entidades
function populateEntityFilter() {
  const filter = document.getElementById("entity-filter");
  const entities = new Set();

  candidates.forEach((candidate) => {
    if (candidate.ENTIDAD && candidate.ESTATUS === "Publicado") {
      entities.add(candidate.ENTIDAD);
    }
  });

  Array.from(entities)
    .sort()
    .forEach((entity) => {
      const option = document.createElement("option");
      option.value = entity;
      option.textContent = entity;
      filter.appendChild(option);
    });
}

// Función para filtrar candidatos por entidad
function filterByEntity(entity) {
  if (entity === "all") {
    renderCandidates();
    return;
  }

  const filtered = candidates.filter(
    (candidate) =>
      candidate.ENTIDAD === entity && candidate.ESTATUS === "Publicado"
  );
  renderCandidates(filtered);
}

// Función para descargar los candidatos seleccionados como PDF
async function downloadSelectedAsPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const selectedCheckboxes = document.querySelectorAll(
    ".candidate-select:checked"
  );

  if (selectedCheckboxes.length === 0) {
    alert("Por favor selecciona al menos un candidato para descargar.");
    return;
  }

  const tempContainer = document.createElement("div");
  tempContainer.style.position = "absolute";
  tempContainer.style.left = "-9999px";
  tempContainer.style.width = "800px";
  document.body.appendChild(tempContainer);

  const title = document.createElement("h1");
  title.textContent = "Candidatos Seleccionados a la Suprema Corte de Justicia";
  title.style.textAlign = "center";
  title.style.marginBottom = "20px";
  tempContainer.appendChild(title);

  selectedCheckboxes.forEach((checkbox) => {
    const candidateId = checkbox.getAttribute("data-id");
    const candidate = candidates.find(
      (c) => c.NUM_LISTA_EN_BOLETA === candidateId
    );
    if (candidate) {
      const card = createCandidateCard(candidate);
      card.style.marginBottom = "20px";
      tempContainer.appendChild(card);
    }
  });

  try {
    const canvas = await html2canvas(tempContainer, {
      scale: 2,
      logging: false,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    doc.addImage(imgData, "PNG", 10, 10, 190, 0);
    doc.save("candidatos_seleccionados.pdf");
  } catch (error) {
    console.error("Error al generar PDF:", error);
    alert("Ocurrió un error al generar el PDF. Por favor intenta nuevamente.");
  } finally {
    document.body.removeChild(tempContainer);
  }
}

// Función para alternar el modo oscuro
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem(
    "darkMode",
    document.body.classList.contains("dark-mode")
  );
}

// Función para alternar el navbar en móviles
function setupNavbarToggle() {
  const toggle = document.getElementById("navbarToggle");
  const links = document.getElementById("navbarLinks");

  toggle.addEventListener("click", () => {
    links.classList.toggle("active");
  });
}

// Función para buscar candidatos por nombre y apellidos
function searchCandidates() {
  const searchInput = document.getElementById("search-input");

  // Normalizar texto: quitar acentos y poner en minúsculas
  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  searchInput.addEventListener("input", (e) => {
    const searchTerm = normalizeText(e.target.value.trim());

    const filtered = candidates.filter((candidate) => {
      if (candidate.ESTATUS !== "Publicado") return false;

      if (!searchTerm) return true; // Mostrar todos si no hay búsqueda

      const fullName = normalizeText(candidate.NOMBRE_CANDIDATO);

      // Buscar coincidencias en nombre completo o partes separadas
      const nameParts = fullName.split(" ");

      // Coincidencia exacta en nombre completo
      if (fullName.includes(searchTerm)) return true;

      // Coincidencia con cualquier parte del nombre
      return nameParts.some((part) => part.startsWith(searchTerm));
    });

    renderCandidates(filtered);
  });

  // Mejorar accesibilidad
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      e.target.value = "";
      renderCandidates();
    }
  });
}

// Función para filtrar candidatos por sexo
function filterByGender(gender) {
  if (gender === "all") {
    renderCandidates();
    return;
  }

  const filtered = candidates.filter(
    (candidate) =>
      candidate.SEXO === gender && candidate.ESTATUS === "Publicado"
  );
  renderCandidates(filtered);
}

// Inicializar la aplicación
document.addEventListener("DOMContentLoaded", () => {
  setupNavbarToggle();
  renderCandidates();
  populateEntityFilter();
  searchCandidates();

  document.getElementById("entity-filter").addEventListener("change", (e) => {
    filterByEntity(e.target.value);
  });

  document.getElementById("gender-filter").addEventListener("change", (e) => {
    filterByGender(e.target.value);
  });

  document
    .getElementById("download-pdf")
    .addEventListener("click", downloadSelectedAsPDF);

  const darkModeToggle = document.getElementById("dark-mode-toggle");
  darkModeToggle.addEventListener("change", toggleDarkMode);

  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    darkModeToggle.checked = true;
  }
});
