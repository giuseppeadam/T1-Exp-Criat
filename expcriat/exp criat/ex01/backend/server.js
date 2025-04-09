const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 5000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0000',
    database: 'crud_db',
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        process.exit(1);
    }
    console.log('Conectado ao banco de dados MySQL.');
});

app.use(cors({
    origin: '*', // Permitir todas as origens
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servidor backend está funcionando!');
});

app.get('/products', (req, res) => {
    const query = 'SELECT * FROM products';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar produtos.' });
        }
        res.status(200).json(results);
    });
});

app.post('/products', (req, res) => {
    const { name, price, description, category, size } = req.body;
    const query = 'INSERT INTO products (name, price, description, category, size) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, price, description, category, size], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao criar produto.' });
        }
        res.status(201).json({ id: result.insertId, name, price, description, category, size });
    });
});

app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, price, description, category, size } = req.body;
    const query = 'UPDATE products SET name = ?, price = ?, description = ?, category = ?, size = ? WHERE id = ?';
    db.query(query, [name, price, description, category, size, id], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao atualizar produto.' });
        }
        res.status(200).json({ id, name, price, description, category, size });
    });
});

app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM products WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao excluir produto.' });
        }
        res.status(200).json({ message: 'Produto excluído com sucesso.' });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
