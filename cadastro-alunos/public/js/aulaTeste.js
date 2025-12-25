document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.cadastro-fixo form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      nome: form.querySelector('input[type="text"]').value,
      email: form.querySelector('input[type="email"]').value,
      telefone: form.querySelector('input[type="tel"]').value,
      idioma: form.idioma.value,
      modalidade: form.Modalidade.value,
      tipoCadastro: 'aula_teste'
    };

    try {
      const response = await fetch('/alunos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Aula teste solicitada com sucesso!');
        form.reset();
      } else {
        alert('Erro ao enviar solicitação');
      }

    } catch {
      alert('Erro de conexão com o servidor');
    }
  });
});