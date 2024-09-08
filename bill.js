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
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();



// Add a new bill
document.getElementById('createBillForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const memberID = document.getElementById('memberID').value;
    const memberName = document.getElementById('memberName').value;
    const amount = document.getElementById('amount').value;
    const billDate = document.getElementById('billDate').value;

    try {
        await db.collection('bills').add({
            memberID,
            memberName,
            amount: parseFloat(amount),
            billDate
        });
        document.getElementById('message').innerText = "Bill created successfully!";
        loadBills(); // Refresh the bills list
    } catch (error) {
        console.error("Error creating bill: ", error);
        document.getElementById('message').innerText = `Error: ${error.message}`;
    }
});

// Load and display bills
async function loadBills() {
    try {
        const billsSnapshot = await db.collection('bills').get();
        const billsTable = document.getElementById('billsTable').getElementsByTagName('tbody')[0];
        billsTable.innerHTML = ''; // Clear existing rows

        billsSnapshot.forEach((doc) => {
            const bill = doc.data();
            const row = billsTable.insertRow();
            row.insertCell(0).innerText = doc.id;
            row.insertCell(1).innerText = bill.memberID;
            row.insertCell(2).innerText = bill.memberName;
            row.insertCell(3).innerText = bill.amount;
            row.insertCell(4).innerText = bill.billDate;
        });
    } catch (error) {
        console.error("Error loading bills: ", error);
    }
}

// Initial load
loadBills();
