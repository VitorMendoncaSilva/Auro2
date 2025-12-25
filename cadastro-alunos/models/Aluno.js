const mongoose = require('mongoose');

const AlunoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  telefone: {
    type: String,
    required: true
  },
  interesse: {
    type: String,
    required: false // Mudamos para false para evitar erros de preenchimento
  },
  tipoCadastro: {
    type: String,
    required: true
    // REMOVEMOS o 'enum', assim ele aceita 'matricula', 'curso' ou 'aula_teste'
  },
  dataCadastro: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Aluno', AlunoSchema);

