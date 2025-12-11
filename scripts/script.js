  function toggleMenu() {
    const menu = document.getElementById("menuMobile");
    if (menu.style.display === "flex") {
      menu.style.display = "none";
    } else {
      menu.style.display = "flex";
    }
  }

  // Fecha o menu mobile ao redimensionar para tela grande
  window.addEventListener("resize", () => {
    const menu = document.getElementById("menuMobile");
    if (window.innerWidth > 768) {
      menu.style.display = "none";
    }
  });


/*FIM Configuracao MENU--------------------------------------------------------FIM*/


function toggleCadastro() {
  const cadastro = document.querySelector('.cadastro-fixo');
  const icone = document.getElementById('icone-toggle');
  
  cadastro.classList.toggle('closed');
  
  // Atualiza o ícone conforme o estado
  if (cadastro.classList.contains('closed')) {
    icone.textContent = '‹'; // seta para a direita (abrir)
  } else {
    icone.textContent = '›'; // seta para a esquerda (fechar)
  }
}

/*FIM CONFIG CADASTRO------------------------------------------------------------------*/

/*COPYRIGHT ATUALIZAÇÂO DE ANO----------------------------------------------------*/
document.getElementById("anoAtual").textContent = new Date().getFullYear();
/*FIM COPYRIGHT ATUALIZAÇÂO DE ANO----------------------------------------------------*/