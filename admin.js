import { firebaseConfig } from './firebase-config.js';

// Initialize Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { getFirestore, collection, query, onSnapshot, doc, updateDoc, orderBy, where } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM elements
const loginSection = document.getElementById('loginSection');
const dashboardSection = document.getElementById('dashboardSection');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');
const requestsList = document.getElementById('requestsList');

// Filters
const statusFilter = document.getElementById('statusFilter');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');

// Stats
const pendingCount = document.getElementById('pendingCount');
const acceptedCount = document.getElementById('acceptedCount');
const completedCount = document.getElementById('completedCount');

let allRequests = [];

// Auth state observer
onAuthStateChanged(auth, (user) => {
    if (user) {
        showDashboard();
        loadRequests();
    } else {
        showLogin();
    }
});

// Login handler
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        loginError.style.display = 'none';
    } catch (error) {
        console.error('Login error:', error);
        loginError.textContent = 'Invalid email or password. Please try again.';
        loginError.style.display = 'block';
    }
});

// Logout handler
logoutBtn.addEventListener('click', async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error('Logout error:', error);
    }
});

// Filter handlers
statusFilter.addEventListener('change', filterAndDisplay);
categoryFilter.addEventListener('change', filterAndDisplay);
sortFilter.addEventListener('change', filterAndDisplay);

function showLogin() {
    loginSection.style.display = 'flex';
    dashboardSection.style.display = 'none';
    logoutBtn.style.display = 'none';
}

function showDashboard() {
    loginSection.style.display = 'none';
    dashboardSection.style.display = 'block';
    logoutBtn.style.display = 'block';
}

function loadRequests() {
    const q = query(collection(db, 'reservations'));

    onSnapshot(q, (snapshot) => {
        allRequests = [];
        snapshot.forEach((doc) => {
            allRequests.push({ id: doc.id, ...doc.data() });
        });
        updateStats();
        filterAndDisplay();
    });
}

function updateStats() {
    const pending = allRequests.filter(r => r.status === 'pending').length;
    const accepted = allRequests.filter(r => r.status === 'accepted').length;
    const completed = allRequests.filter(r => r.status === 'completed').length;

    pendingCount.textContent = pending;
    acceptedCount.textContent = accepted;
    completedCount.textContent = completed;
}

function filterAndDisplay() {
    let filtered = [...allRequests];

    // Status filter
    const status = statusFilter.value;
    if (status !== 'all') {
        filtered = filtered.filter(r => r.status === status);
    }

    // Category filter
    const category = categoryFilter.value;
    if (category !== 'all') {
        filtered = filtered.filter(r => r.eventType === category);
    }

    // Sort
    const sort = sortFilter.value;
    filtered.sort((a, b) => {
        if (sort === 'newest') {
            return (b.submittedAt?.seconds || 0) - (a.submittedAt?.seconds || 0);
        } else if (sort === 'oldest') {
            return (a.submittedAt?.seconds || 0) - (b.submittedAt?.seconds || 0);
        } else if (sort === 'eventDate') {
            return new Date(a.eventDate) - new Date(b.eventDate);
        }
        return 0;
    });

    displayRequests(filtered);
}

function displayRequests(requests) {
    if (requests.length === 0) {
        requestsList.innerHTML = '<p class="loading">No requests found matching your filters.</p>';
        return;
    }

    requestsList.innerHTML = requests.map(request => createRequestCard(request)).join('');

    // Add event listeners to buttons
    requests.forEach(request => {
        const card = document.getElementById(`request-${request.id}`);
        if (!card) return;

        const acceptBtn = card.querySelector('.btn-accept');
        const completeBtn = card.querySelector('.btn-complete');
        const declineBtn = card.querySelector('.btn-decline');

        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => updateRequestStatus(request.id, 'accepted'));
        }
        if (completeBtn) {
            completeBtn.addEventListener('click', () => updateRequestStatus(request.id, 'completed'));
        }
        if (declineBtn) {
            declineBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to decline this request?')) {
                    updateRequestStatus(request.id, 'declined');
                }
            });
        }
    });
}

function createRequestCard(request) {
    const submittedDate = request.submittedAt
        ? new Date(request.submittedAt.seconds * 1000).toLocaleDateString()
        : 'Unknown';

    const eventDate = new Date(request.eventDate).toLocaleDateString();

    const eventTypeLabels = {
        'quinceanera': 'Quinceañera',
        'sweet16': 'Sweet 16',
        'other': 'Other'
    };

    const whatsappLink = `https://wa.me/${request.phone.replace(/\D/g, '')}?text=Hi ${request.customerName}, thank you for your reservation request for ${request.honoreeName}'s ${eventTypeLabels[request.eventType]}!`;

    let actions = '';
    if (request.status === 'pending') {
        actions = `
            <button class="btn-accept">Accept</button>
            <button class="btn-decline">Decline</button>
        `;
    } else if (request.status === 'accepted') {
        actions = `
            <button class="btn-complete">Mark Complete</button>
        `;
    }

    return `
        <div class="request-card status-${request.status}" id="request-${request.id}">
            <div class="request-header">
                <div class="request-title">
                    <h3>${request.honoreeName} - ${eventTypeLabels[request.eventType]}</h3>
                    <div class="request-meta">
                        <span>Submitted: ${submittedDate}</span>
                        <span>Event: ${eventDate}</span>
                    </div>
                </div>
                <span class="status-badge ${request.status}">${request.status}</span>
            </div>

            <div class="request-details">
                <div class="detail-item">
                    <span class="detail-label">Customer Name</span>
                    <span class="detail-value">${request.customerName}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Email</span>
                    <span class="detail-value"><a href="mailto:${request.email}">${request.email}</a></span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Phone</span>
                    <span class="detail-value">${request.phone}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Color Scheme</span>
                    <span class="detail-value">${request.colorScheme || 'Not specified'}</span>
                </div>
            </div>

            ${request.details ? `
                <div style="margin: 1rem 0;">
                    <span class="detail-label">Additional Details:</span>
                    <p style="margin-top: 0.5rem;">${request.details}</p>
                </div>
            ` : ''}

            ${request.inspiration ? `
                <div style="margin: 1rem 0;">
                    <span class="detail-label">Inspiration:</span>
                    <p style="margin-top: 0.5rem;">${request.inspiration}</p>
                </div>
            ` : ''}

            <div class="request-actions">
                ${actions}
                <a href="${whatsappLink}" target="_blank" class="btn-contact">Contact via WhatsApp</a>
            </div>
        </div>
    `;
}

async function updateRequestStatus(requestId, newStatus) {
    try {
        await updateDoc(doc(db, 'reservations', requestId), {
            status: newStatus
        });
    } catch (error) {
        console.error('Error updating status:', error);
        alert('Failed to update request status. Please try again.');
    }
}
