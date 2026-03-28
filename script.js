// ---------- Counter Logic ----------
let counter = 0;
const counterElement = document.getElementById('counterValue');

function updateCounterDisplay() {
  counterElement.textContent = counter;
}

document.getElementById('incrementBtn').addEventListener('click', () => {
  counter++;
  updateCounterDisplay();
});

document.getElementById('decrementBtn').addEventListener('click', () => {
  if (counter > 0) {
    counter--;
    updateCounterDisplay();
  }
});

document.getElementById('resetBtn').addEventListener('click', () => {
  counter = 0;
  updateCounterDisplay();
});

// ---------- Dark/Light Mode Toggle ----------
const toggleBtn = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved preference
const savedMode = localStorage.getItem('theme');
if (savedMode === 'dark') {
  body.classList.remove('light');
  body.classList.add('dark');
  toggleBtn.textContent = '☀️ Light Mode';
} else {
  body.classList.remove('dark');
  body.classList.add('light');
  toggleBtn.textContent = '🌙 Dark Mode';
}

toggleBtn.addEventListener('click', () => {
  if (body.classList.contains('light')) {
    body.classList.remove('light');
    body.classList.add('dark');
    toggleBtn.textContent = '☀️ Light Mode';
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark');
    body.classList.add('light');
    toggleBtn.textContent = '🌙 Dark Mode';
    localStorage.setItem('theme', 'light');
  }
});

// ---------- Load Users from API ----------
const loadUsersBtn = document.getElementById('loadUsersBtn');
const usersGrid = document.getElementById('usersGrid');

async function fetchUsers() {
  // Show loading state
  usersGrid.innerHTML = '<p style="color: var(--text-secondary);">Loading users...</p>';
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) throw new Error('Failed to fetch');
    const users = await response.json();
    
    // Clear grid and populate
    usersGrid.innerHTML = '';
    users.forEach(user => {
      const card = document.createElement('div');
      card.className = 'user-card';
      card.innerHTML = `
        <h3>${escapeHtml(user.name)}</h3>
        <p><strong>Email:</strong> ${escapeHtml(user.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(user.phone)}</p>
        <p><strong>Company:</strong> ${escapeHtml(user.company.name)}</p>
      `;
      usersGrid.appendChild(card);
    });
  } catch (error) {
    usersGrid.innerHTML = '<p style="color: #ef4444;">Error loading users. Please try again.</p>';
    console.error(error);
  }
}

// Helper to prevent XSS (though API data is safe)
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

loadUsersBtn.addEventListener('click', fetchUsers);