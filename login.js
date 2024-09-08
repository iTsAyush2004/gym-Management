import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAsZLGwkaoJ3EsbC0NRhgjKmF9-031Xfs0",
    authDomain: "energym-615ba.firebaseapp.com",
    projectId: "energym-615ba",
    storageBucket: "energym-615ba.appspot.com",
    messagingSenderId: "701164552781",
    appId: "1:701164552781:web:4d607d2b6f68cb753dd204"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Event listener for the form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the email and password values from the input fields
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;

    // Sign in the user with email and password
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Successful login
            document.getElementById('loginMessage').innerText = "Login successful!";
            console.log("User signed in:", userCredential.user);
            // Redirect to the admin page
            window.location.href = "addmin_page.html";
        })
        .catch((error) => {
            // Handle errors here
            const errorMessage = error.message;
            document.getElementById('loginMessage').innerText = `Error: ${errorMessage}`;
            console.error("Login failed:", error);
        });
});
