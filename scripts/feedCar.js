/*FEED CARROSSEL -----------------------------------------------------------------------*/

const modal = document.getElementById("feedbackModal");
const modalText = document.getElementById("modalText");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".feedback-card").forEach(card => {
  card.addEventListener("click", () => {
    // Pega o texto completo do atributo data-fulltext
    modalText.innerText = card.dataset.fulltext;
    modal.style.display = "block";
  });
});

closeBtn.onclick = () => modal.style.display = "none";

window.onclick = (event) => {
  if (event.target == modal) modal.style.display = "none";
};

/*FIM FEED CARROSSEL -----------------------------------------------------------------------*/
