// ---------------------------
// script.js (CORRIGIDO E MELHORADO)
// ---------------------------

// 1. Seleção de elementos
const form = document.getElementById('registration-form');
const successMessage = document.getElementById('success-message');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.getElementById('btn-text');
const btnSpinner = document.getElementById('btn-spinner');
const cardOptions = document.querySelectorAll('.card-option');

// ---------------------------
// 2. Função para atualizar o visual dos cards de um grupo
function updateCardSelection(radioInput) {
  if (!radioInput) return;

  const groupName = radioInput.name;
  const selectedId = radioInput.id;

  // Remove destaque de todos os cards do mesmo grupo (mesmo name)
  document.querySelectorAll(`input[name="${groupName}"]`).forEach(input => {
    const label = document.querySelector(`label[for="${input.id}"]`);
    if (label) {
      label.classList.remove('border-[#0097b2]', 'shadow-lg', 'bg-blue-50');
    }
  });

  // Adiciona destaque ao selecionado
  const selectedLabel = document.querySelector(`label[for="${selectedId}"]`);
  if (selectedLabel) {
    selectedLabel.classList.add('border-[#0097b2]', 'shadow-lg', 'bg-blue-50');
  }
}

// ---------------------------
// 3. Adiciona clique nos cards
cardOptions.forEach((card) => {
  card.addEventListener('click', () => {
    const inputId = card.getAttribute('for');
    const input = document.getElementById(inputId);
    
    if (input && !input.checked) {
      input.checked = true;
      updateCardSelection(input);
    }
  });
});

// ---------------------------
// 4. Sincroniza visual quando o radio é marcado diretamente (ex: teclado)
document.querySelectorAll('input[type="radio"]').forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.checked) {
      updateCardSelection(radio);
    }
  });

  // Estado inicial (caso algum esteja pré-selecionado)
  if (radio.checked) {
    updateCardSelection(radio);
  }
});

// ---------------------------
// 5. Função para loading no botão
function setLoading(isLoading) {
  if (isLoading) {
    btnText.classList.add('hidden');
    btnSpinner.classList.remove('hidden');
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-80');
  } else {
    btnText.classList.remove('hidden');
    btnSpinner.classList.add('hidden');
    submitBtn.disabled = false;
    submitBtn.classList.remove('opacity-80');
  }
}

// ---------------------------
// 6. Envio do formulário
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  setLoading(true);

  // Coleta dados
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  try {
    // Simulação de envio (substitua por fetch real)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Sucesso
    successMessage.classList.remove('hidden');
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Limpa formulário e remove destaques
    form.reset();
    cardOptions.forEach(card => {
      card.classList.remove('border-[#0097b2]', 'shadow-lg', 'bg-blue-50');
    });

  } catch (err) {
    console.error('Erro ao enviar formulário:', err);
    alert('Ocorreu um erro ao enviar o cadastro. Tente novamente.');
  } finally {
    setLoading(false);
  }
});
