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

// Notification form submit
document.getElementById('notificationForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const notificationContent = document.getElementById('notificationContent').value;
    
    if (!notificationContent) {
        document.getElementById('message').innerText = "Please write a notification!";
        return;
    }

    try {
        // Add the notification to Firestore
        await db.collection('notifications').add({
            content: notificationContent,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        document.getElementById('message').innerText = "Notification sent successfully!";
        document.getElementById('notificationContent').value = ''; // Clear the textarea
    } catch (error) {
        console.error("Error adding notification:", error);
        document.getElementById('message').innerText = `Error: ${error.message}`;
    }
});
