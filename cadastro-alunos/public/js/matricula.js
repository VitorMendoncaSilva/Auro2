document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registration-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      nome: form.nome.value,
      email: form.email.value,
      whatsapp: form.whatsapp.value,
      idioma: form.idioma.value,
      modalidade: form.modalidade.value,
      pacote: form.pacote.value,
      tipoCadastro: 'matricula'
    };

    try {
      const response = await fetch('/alunos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Matrícula enviada com sucesso!');
        form.reset();
      } else {
        alert('Erro ao enviar matrícula');
      }

    } catch {
      alert('Erro de conexão com o servidor');
    }
  });
});
