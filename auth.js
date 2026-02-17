// Authentication Logic

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const loginBtn = document.getElementById('login-btn');
    const errorMessage = document.getElementById('error-message');

    // Disable button and show loading state
    loginBtn.disabled = true;
    loginBtn.textContent = 'Signing in...';
    errorMessage.classList.remove('show');

    // Sign in with Firebase Auth
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Success - redirect to analytics
            console.log('Login successful:', userCredential.user.email);
            window.location.href = 'analytics.html';
        })
        .catch((error) => {
            // Show error message
            loginBtn.disabled = false;
            loginBtn.textContent = 'Sign In';

            let errorText = 'Login failed. Please check your credentials.';

            switch (error.code) {
                case 'auth/invalid-email':
                    errorText = 'Invalid email address format.';
                    break;
                case 'auth/user-disabled':
                    errorText = 'This account has been disabled.';
                    break;
                case 'auth/user-not-found':
                    errorText = 'No account found with this email.';
                    break;
                case 'auth/wrong-password':
                    errorText = 'Incorrect password.';
                    break;
                case 'auth/invalid-credential':
                    errorText = 'Invalid email or password.';
                    break;
                case 'auth/too-many-requests':
                    errorText = 'Too many failed attempts. Please try again later.';
                    break;
            }

            errorMessage.textContent = '❌ ' + errorText;
            errorMessage.classList.add('show');
            console.error('Login error:', error);
        });
}

// Handle logout
function handleLogout() {
    firebase.auth().signOut()
        .then(() => {
            console.log('Logout successful');
            window.location.href = 'login.html';
        })
        .catch((error) => {
            console.error('Logout error:', error);
            alert('Error logging out: ' + error.message);
        });
}

// Check if user is already logged in (for login page)
if (window.location.pathname.includes('login.html')) {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // Already logged in, redirect to analytics
            window.location.href = 'analytics.html';
        }
    });
}

// Protect analytics page - redirect to login if not authenticated
if (window.location.pathname.includes('analytics.html')) {
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            // Not logged in, redirect to login page
            window.location.href = 'login.html';
        } else {
            console.log('User authenticated:', user.email);
            // User is logged in, show their email if element exists
            const userEmailElement = document.getElementById('user-email');
            if (userEmailElement) {
                userEmailElement.textContent = user.email;
            }
        }
    });
}
