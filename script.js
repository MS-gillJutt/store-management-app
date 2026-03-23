
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const userDashboard = document.getElementById('user-dashboard');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(result.user));
                window.location.href = 'index.html';
            } else {
                const errorDiv = document.getElementById('error-message');
                errorDiv.textContent = result.message || result.errors[0].msg;
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                window.location.href = 'login.html';
            } else {
                const errorDiv = document.getElementById('error-message');
                errorDiv.textContent = result.error || result.errors[0].msg;
            }
        });
    }

    if (userDashboard) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const firstName = user.username.split(' ')[0];
            document.getElementById('user-name').textContent = firstName;
        }
    }
});
