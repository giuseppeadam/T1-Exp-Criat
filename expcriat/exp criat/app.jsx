const { useState, useEffect } = React;

function App() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: ''
    });

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(error => console.error('Error:', error));
    };

    const fetchUsers = () => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error:', error));
    };

    return (
        <div>
            <h1>Cadastro</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nome">Nome:</label>
                <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required /><br /><br />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required /><br /><br />

                <label htmlFor="senha">Senha:</label>
                <input type="password" id="senha" name="senha" value={formData.senha} onChange={handleChange} required /><br /><br />

                <label htmlFor="confirmar-senha">Confirmar Senha:</label>
                <input type="password" id="confirmar-senha" name="confirmarSenha" value={formData.confirmarSenha} onChange={handleChange} required /><br /><br />

                <input type="submit" value="Cadastrar" />
            </form>

            <h2>Usuários</h2>
            <div id="user-data">
                {users.map(user => (
                    <div key={user.id}>
                        ID: {user.id}, Name: {user.name}, Email: {user.email}
                    </div>
                ))}
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
