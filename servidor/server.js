const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

let jogosPS5 = [];

app.post('/jogosPS5', (req, res) => {
    const { nome} = req.body;
    
    if (!nomeJogo) {
        return res.status(400).json({ erro: 'O nome é obrigatório' });
    }

    const novoJogo = { id: jogosPS5.length + 1, nome};
    jogosPS5.push(novoJogo);
    
    res.status(201).json(novojogo);
});

app.get('/jogosPS5', (req, res) => {
    res.status(200).json(jogosPS5);
});

app.get('/jogosPS5/:id', (req, res) => {
    const { id } = req.params;
    const jogo = jogosPS5.find(u => u.id === parseInt(id));
    
    if (!jogo) {
        return res.status(404).json({ erro: 'Jogo não encontrado 🙁' });
    }
    
    res.status(200).json(jogosPS5);
});

app.put('/jogosPS5/:id', (req, res) => {
    const { id } = req.params;
    
    const jogosPS5 = jogosPS5.find(u => u.id === parseInt(id));
    
    if (!jogosPS5) {
        return res.status(404).json({ erro: 'Jogo não encontrado 🙁' });
    }
    
    jogosPS5.nome = nome || jogosPS5.nome;
    
    res.status(200).json(jogosPS5);
});

app.delete('/jogosPS5/:id', (req, res) => {
    const { id } = req.params;
    const index = jogosPS5.findIndex(u => u.id === parseInt(id));
    
    if (index === -1) {
        return res.status(404).json({ erro: 'Jogo não encontrado 🙁' });
    }
    
    jogosPS5.splice(index, 1);
    res.status(204).send();
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
