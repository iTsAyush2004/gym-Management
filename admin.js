// admin-dashboard.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Firebase configuration
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
const auth = getAuth(app);
const db = getFirestore(app);

// Listen for authentication state change
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User is signed in, now check if they are an admin
        const userRef = doc(db, "users", user.uid);  // Assuming 'users' collection in Firestore
        const userDoc = await getDoc(userRef);

        if (userDoc.exists() && userDoc.data().role === "admin") {
            console.log("Welcome, admin!");
            // Admin has access, you can load the admin dashboard
        } else {
            // Not an admin, redirect or show an error
            alert("You do not have access to this page.");
            window.location.href = "login.html"; // Redirect to login page
        }
    } else {
        // No user is signed in, redirect to login page
        window.location.href = "login.html";
    }
});

// Sign out admin if needed
const signOutBtn = document.getElementById("signOutBtn");
signOutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "login.html"; // Redirect to login page after sign-out
    }).catch((error) => {
        console.error("Sign-out error:", error);
    });
});
