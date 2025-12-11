  // Mostrar os planos de inglês ao clicar
const englishBtn = document.querySelector(".btn-english");
const spanishBtn = document.querySelector(".btn-spanish");
const englishPlans = document.getElementById("englishPlans");
const spanishPlans = document.getElementById("spanishPlans");

// Função para toggle com cortina
function togglePlans(openPlans, closePlans) {
  if (openPlans.style.maxHeight && openPlans.style.maxHeight !== "0px") {
    openPlans.style.maxHeight = "0"; // fecha
  } else {
    // fecha o outro
    closePlans.style.maxHeight = "0";
    // abre este
    openPlans.style.maxHeight = openPlans.scrollHeight + "px";
  }
}

englishBtn.addEventListener("click", function(e) {
  e.preventDefault();
  togglePlans(englishPlans, spanishPlans);
});

spanishBtn.addEventListener("click", function(e) {
  e.preventDefault();
  togglePlans(spanishPlans, englishPlans);
});