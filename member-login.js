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
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Login Form Submit
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const memberID = document.getElementById('password').value; // Using 'password' field for member ID input

    if (!email || !memberID) {
        document.getElementById('loginMessage').innerText = "Email and Member ID are required!";
        return;
    }

    try {
        // Search Firestore for a member with the entered email
        const memberSnapshot = await db.collection('members').where('email', '==', email).get();

        if (memberSnapshot.empty) {
            document.getElementById('loginMessage').innerText = "No member found with this email!";
            return;
        }

        // Check if the entered memberID matches the document ID
        const memberDoc = memberSnapshot.docs[0];
        if (memberDoc.id === memberID) {
            document.getElementById('loginMessage').innerText = "Login successful!";
            
            // Check if the user is a member or admin
            const isAdmin = await db.collection('admins').doc(memberDoc.id).get().then(doc => doc.exists);

            if (isAdmin) {
                // If admin, redirect to the admin dashboard
                window.location.href = "admin-dashboard.html";
            } else {
                // If member, redirect to the member dashboard
                localStorage.setItem('memberID', memberDoc.id); // Save member's Firestore document ID
                window.location.href = "member-dashboard.html";
            }
        } else {
            document.getElementById('loginMessage').innerText = "Invalid Member ID!";
        }
    } catch (error) {
        console.error("Error logging in:", error);
        document.getElementById('loginMessage').innerText = `Error: ${error.message}`;
    }
});
