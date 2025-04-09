document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        senha: formData.get('senha'),
        confirmarSenha: formData.get('confirmar-senha')
    };

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(error => console.error('Error:', error));
});

function fetchData() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {
            const apiDataDiv = document.getElementById('api-data');
            data.forEach(item => {
                const div = document.createElement('div');
                div.textContent = `ID: ${item.id}, Title: ${item.title}`;
                apiDataDiv.appendChild(div);
            });
        })
        .catch(error => console.error('Error:', error));
}

function fetchUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            const userDataDiv = document.getElementById('user-data');
            users.forEach(user => {
                const div = document.createElement('div');
                div.textContent = `ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`;
                userDataDiv.appendChild(div);
            });
        })
        .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    fetchUsers();
});
