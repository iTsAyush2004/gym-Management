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

// Fetch and display notifications
const notificationList = document.getElementById('notificationList');

const loadNotifications = async () => {
    try {
        const snapshot = await db.collection('notifications').orderBy('timestamp', 'desc').get();

        notificationList.innerHTML = ''; // Clear any existing notifications

        snapshot.forEach(doc => {
            const notification = doc.data();
            const notificationElement = document.createElement('div');
            notificationElement.classList.add('notification');
            notificationElement.innerHTML = `
                <p>${notification.content}</p>
                <span>${new Date(notification.timestamp.toDate()).toLocaleString()}</span>
            `;
            notificationList.appendChild(notificationElement);
        });
    } catch (error) {
        console.error("Error fetching notifications:", error);
    }
};

// Load notifications on page load
loadNotifications();
