document.addEventListener("DOMContentLoaded", function () {
    const authForm = document.getElementById("auth-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const formTitle = document.getElementById("form-title");
    const toggleText = document.getElementById("toggle-text");
    const toggleLink = document.getElementById("toggle-link");
    const errorMessage = document.getElementById("error-message");
    const forgotPasswordLink = document.getElementById("forgot-password");
    const togglePassword = document.getElementById("toggle-password");
    const passwordRules = document.getElementById("password-rules");
    const eyeOpen = document.getElementById("eye-open");
    const eyeClosed = document.getElementById("eye-closed");

    let isRegistering = false;

    // Email validation
    function validateEmail(email) {
        const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        return emailRegex.test(email);
    }

    // Password validation (only for sign up)
    function validatePassword(password) {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }

    // Toggle between Login & Sign Up
    toggleLink.addEventListener("click", function (e) {
        e.preventDefault();
        isRegistering = !isRegistering;
        formTitle.textContent = isRegistering ? "Sign Up" : "Login";
        toggleText.textContent = isRegistering ? "Already have an account?" : "Don't have an account?";
        toggleLink.textContent = isRegistering ? "Login" : "Sign Up";
        forgotPasswordLink.style.display = isRegistering ? "none" : "block";
        
        // Show password rules only in Sign Up mode
        passwordRules.style.display = isRegistering ? "block" : "none";
    });

    // Store user in localStorage
    function saveUser(email, password) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push({ email, password });
        localStorage.setItem("users", JSON.stringify(users));
    }

    // Check if user exists
    function userExists(email) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        return users.some(user => user.email === email);
    }

    // Validate login credentials
    function validateLogin(email, password) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        return users.some(user => user.email === email && user.password === password);
    }

    // Handle form submission (Login/Register)
    authForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        errorMessage.textContent = ""; // Clear previous errors

        if (!validateEmail(email)) {
            errorMessage.textContent = "Invalid email format. Please enter a valid email.";
            return;
        }

        if (isRegistering) {
            if (!validatePassword(password)) {
                errorMessage.textContent = "Password must have at least 8 characters, 1 uppercase letter, 1 number, and 1 special character.";
                return;
            }
            if (userExists(email)) {
                errorMessage.textContent = "Email is already registered. Please log in.";
                return;
            } 
            saveUser(email, password);
            alert("User registered successfully! Please log in.");
            toggleLink.click(); // Switch to login view
        } else {
            if (validateLogin(email, password)) {
                alert("Login Successful!");
            } else {
                errorMessage.textContent = "Invalid email or password.";
                return;
            }
        }

        authForm.reset();
    });

    // Toggle Password Visibility
    togglePassword.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            eyeOpen.style.display = "none";
            eyeClosed.style.display = "inline";
        } else {
            passwordInput.type = "password";
            eyeOpen.style.display = "inline";
            eyeClosed.style.display = "none";
        }
    });
});
