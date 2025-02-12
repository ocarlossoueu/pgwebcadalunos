const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Listar todos os registros
app.get('/alunos', async (req, res) => {
  try {
    const alunos = await prisma.aluno.findMany();
    res.json(alunos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar alunos' });
  }
});

// Listar um registro específico (por id)
app.get('/alunos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const aluno = await prisma.aluno.findUnique({
      where: { id: Number(id) },
    });
    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }
    res.json(aluno);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar aluno' });
  }
});

// Criar um novo registro
app.post('/alunos', async (req, res) => {
  const { nome, email, matricula } = req.body;
  try {
    const aluno = await prisma.aluno.create({
      data: { nome, email, matricula },
    });
    res.status(201).json(aluno);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar aluno' });
  }
});

// Atualizar um registro
app.put('/alunos/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email, matricula } = req.body;
  try {
    const aluno = await prisma.aluno.update({
      where: { id: Number(id) },
      data: { nome, email, matricula },
    });
    res.json(aluno);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar aluno' });
  }
});

// Deletar um registro
app.delete('/alunos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.aluno.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar aluno' });
  }
});

// Inicializa o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
