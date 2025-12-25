require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const rateLimit = require('express-rate-limit');
const Aluno = require('./models/Aluno');

const app = express();

/* =========================
   MIDDLEWARES BÁSICOS
========================= */
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

/* =========================
   RATE LIMIT (ANTI-SPAM)
========================= */
const alunosLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 15, // Aumentei um pouco para testes
  message: { error: 'Muitas tentativas. Aguarde um minuto.' }
});

/* =========================
   CONEXÃO COM O MONGODB
========================= */
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB conectado com sucesso'))
  .catch(err => console.error('Erro ao conectar no MongoDB:', err));

/* =========================
   ROTAS
========================= */

// Rota raiz → index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 🔐 ROTA HÍBRIDA DE CADASTRO (Aceita Home e Matrícula)
app.post('/alunos', alunosLimiter, async (req, res) => {
  const { 
    nome, email, 
    telefone, whatsapp,           
    interesse, idioma, modalidade, pacote, 
    tipoCadastro 
  } = req.body;

  // 1. Validação mínima (Nome, Email e algum número de contato)
  if (!nome || !email || (!telefone && !whatsapp)) {
    return res.status(400).json({ 
      error: 'Nome, e-mail e telefone/whatsapp são obrigatórios.' 
    });
  }

  try {
    // 2. Montagem inteligente do objeto para o MongoDB
    const dadosDoAluno = {
      nome,
      email,
      // Se vier whatsapp (pág cadastro), usa ele. Se não, usa telefone (home).
      telefone: whatsapp || telefone,
      // Se vier idioma (pág cadastro), monta a descrição. Se não, usa interesse (home).
      interesse: idioma ? `${idioma} - ${modalidade} - ${pacote}` : interesse,
      tipoCadastro: tipoCadastro || 'site'
    };

    const aluno = new Aluno(dadosDoAluno);
    await aluno.save();

    res.status(201).json({ message: 'Cadastro realizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao salvar no MongoDB:', error);
    res.status(500).json({ error: 'Erro interno no servidor ao salvar aluno.' });
  }
});

/* =========================
   SERVIDOR
========================= */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});