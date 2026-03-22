document.addEventListener('DOMContentLoaded', () => {
    // Common functionality for all pages (e.g., checking login status)
    const headerUser = document.querySelector('.header-user');
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (headerUser) {
        if (loggedInUser) {
            headerUser.innerHTML = `<p>Welcome, ${loggedInUser} | <a href="#" id="logout-link">Logout</a></p>`;
            const logoutLink = document.getElementById('logout-link');
            if (logoutLink) {
                logoutLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    localStorage.removeItem('loggedInUser');
                    window.location.href = 'login.html';
                });
            }
        } else {
            headerUser.innerHTML = '<p><a href="login.html">Login</a> | <a href="signup.html">Sign Up</a></p>';
        }
    }

    // For index.html specific functionality
    if (document.body.classList.contains('dashboard-page')) {
        if (!loggedInUser) {
            window.location.href = 'login.html'; // Redirect to login if not logged in
        }
        const newOrderBtn = document.getElementById('new-order-btn');
        const addItemBtn = document.getElementById('add-item-btn');

        if (newOrderBtn) {
            newOrderBtn.addEventListener('click', () => {
                alert('Starting a new order...');
            });
        }

        if (addItemBtn) {
            addItemBtn.addEventListener('click', () => {
                alert('Navigating to add new item page...');
            });
        }
    }

    // For login.html specific functionality
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value; // For demonstration

            // Basic validation and simulated login
            if (email && password) {
                // In a real application, you would send this to a backend for authentication.
                // For this example, we'll simulate a successful login.
                console.log(`Attempting to log in with email: ${email}`);
                localStorage.setItem('loggedInUser', email); // Store user email as a simulated session
                window.location.href = 'index.html'; // Redirect to dashboard
            } else {
                alert('Please enter both email and password.');
            }
        });
    }

    // For signup.html specific functionality
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value; // For demonstration

            // Basic validation and simulated signup
            if (username && email && password) {
                // In a real application, you would send this to a backend for user registration.
                // For this example, we'll simulate a successful signup and then log the user in.
                console.log(`Attempting to sign up user: ${username} with email: ${email}`);
                localStorage.setItem('loggedInUser', email); // Store user email as a simulated session
                window.location.href = 'index.html'; // Redirect to dashboard
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
});
