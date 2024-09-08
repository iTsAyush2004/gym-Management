// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAsZLGwkaoJ3EsbC0NRhgjKmF9-031Xfs0",
    authDomain: "energym-615ba.firebaseapp.com",
    projectId: "energym-615ba",
    storageBucket: "energym-615ba.appspot.com",
    messagingSenderId: "701164552781",
    appId: "1:701164552781:web:4d607d2b6f68cb753dd204"
};

// Initialize Firebase App
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}
const db = firebase.firestore();

// Add a new member
document.getElementById('addMemberForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('memberName').value;
    const email = document.getElementById('memberEmail').value;
    const phone = document.getElementById('memberPhone').value;
    const dateJoined = document.getElementById('join_date').value; // Date field

    try {
        await db.collection('members').add({ name, email, phone, dateJoined });
        document.getElementById('addMessage').innerText = "Member added successfully!";
        loadMembers(); // Refresh the member list
    } catch (error) {
        console.error("Error adding member: ", error);
        document.getElementById('addMessage').innerText = `Error: ${error.message}`;
    }

    // Clear form fields after submission
    document.getElementById('addMemberForm').reset();
});

// Update a member
document.getElementById('updateMemberForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const id = document.getElementById('updateMemberId').value;
    const name = document.getElementById('updateMemberName').value;
    const email = document.getElementById('updateMemberEmail').value;
    const phone = document.getElementById('updateMemberPhone').value;

    try {
        const memberDoc = db.collection('members').doc(id);
        await memberDoc.update({ name, email, phone });
        document.getElementById('updateMessage').innerText = "Member updated successfully!";
        loadMembers(); // Refresh the member list
    } catch (error) {
        console.error("Error updating member: ", error);
        document.getElementById('updateMessage').innerText = `Error: ${error.message}`;
    }

    // Clear form fields after submission
    document.getElementById('updateMemberForm').reset();
});

// Load and display members
async function loadMembers() {
    try {
        const membersSnapshot = await db.collection('members').get();
        const membersTable = document.getElementById('membersTable').getElementsByTagName('tbody')[0];
        membersTable.innerHTML = ''; // Clear existing rows

        membersSnapshot.forEach((doc) => {
            const member = doc.data();
            const row = membersTable.insertRow();
            row.insertCell(0).innerText = doc.id;
            row.insertCell(1).innerText = member.name;
            row.insertCell(2).innerText = member.email;
            row.insertCell(3).innerText = member.phone;
            row.insertCell(4).innerText = member.dateJoined; // Add dateJoined to the table

            const deleteCell = row.insertCell(5);
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.addEventListener('click', async () => {
                try {
                    await db.collection('members').doc(doc.id).delete();
                    loadMembers(); // Refresh the member list
                } catch (error) {
                    console.error("Error deleting member: ", error);
                }
            });
            deleteCell.appendChild(deleteButton);
        });
    } catch (error) {
        console.error("Error loading members: ", error);
    }
}

// Initial load
loadMembers();
