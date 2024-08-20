// src/main/resources/static/login.js
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (response.ok) {
            sessionStorage.setItem('isAuthenticated', 'true');
            window.location.href = 'product-list.html';
        } else {
            alert('Invalid credentials');
        }
    });
});
