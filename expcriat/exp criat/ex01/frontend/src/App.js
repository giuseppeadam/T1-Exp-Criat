import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '', description: '', category: '', size: '' });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [view, setView] = useState('list');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/products');
      if (!response.ok) throw new Error('Erro ao carregar produtos.');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = selectedProduct ? 'PUT' : 'POST';
      const url = selectedProduct
        ? `http://localhost:5000/products/${selectedProduct.id}`
        : 'http://localhost:5000/products';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Erro ao salvar o produto.');

      setFormData({ name: '', price: '', description: '', category: '', size: '' });
      setSelectedProduct(null);
      setView('list');
      fetchProducts();
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erro ao excluir o produto.');

      fetchProducts();
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      size: product.size
    });
    setView('form');
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setView('details');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="giant-name">GIUSEPPE STRINGHINI ADAM</h1>
        <h1>CRUD de Produtos</h1>

        {error && <p className="error">{error}</p>}

        {view === 'list' && (
          <>
            <button onClick={() => setView('form')}>Adicionar Produto</button>
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Preço</th>
                  <th>Descrição</th>
                  <th>Categoria</th>
                  <th>Tamanho</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.description}</td>
                    <td>{product.category}</td>
                    <td>{product.size}</td>
                    <td>
                      <button onClick={() => handleViewDetails(product)}>Detalhes</button>
                      <button onClick={() => handleEdit(product)}>Editar</button>
                      <button onClick={() => handleDelete(product.id)}>Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
        {view === 'form' && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Nome"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Preço"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="description"
              placeholder="Descrição"
              value={formData.description}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="category"
              placeholder="Categoria"
              value={formData.category}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="size"
              placeholder="Tamanho"
              value={formData.size}
              onChange={handleInputChange}
            />
            <button type="submit">{selectedProduct ? 'adicionar' : 'Adicionar'}</button>
            <button type="button" onClick={() => setView('list')}>
              Cancelar
            </button>
          </form>
        )}
        {view === 'details' && selectedProduct && (
          <div>
            <h2>Detalhes do Produto</h2>
            <p><strong>Nome:</strong> {selectedProduct.name}</p>
            <p><strong>Preço:</strong> {selectedProduct.price}</p>
            <p><strong>Descrição:</strong> {selectedProduct.description}</p>
            <p><strong>Categoria:</strong> {selectedProduct.category}</p>
            <p><strong>Tamanho:</strong> {selectedProduct.size}</p>
            <button onClick={() => setView('list')}>Voltar</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
