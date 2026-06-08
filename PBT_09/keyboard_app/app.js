// --- Gallery Logic ---
const images = [
    { id: 1, url: 'https://placehold.co/800x400/2563eb/ffffff?text=Image+1', alt: 'Beautiful landscape 1' },
    { id: 2, url: 'https://placehold.co/800x400/10b981/ffffff?text=Image+2', alt: 'City skyline 2' },
    { id: 3, url: 'https://placehold.co/800x400/f59e0b/ffffff?text=Image+3', alt: 'Ocean view 3' },
    { id: 4, url: 'https://placehold.co/800x400/ef4444/ffffff?text=Image+4', alt: 'Mountain peak 4' },
    { id: 5, url: 'https://placehold.co/800x400/8b5cf6/ffffff?text=Image+5', alt: 'Forest trail 5' }
];

let currentIndex = 0;
let isPlaying = false;
let playInterval;

const mainImage = document.getElementById('mainImage');
const thumbnailsContainer = document.getElementById('thumbnailsContainer');
const playIndicator = document.getElementById('playIndicator');
const playBtn = document.getElementById('playBtn');

function initGallery() {
    images.forEach((img, index) => {
        const btn = document.createElement('button');
        btn.className = `thumb-btn ${index === currentIndex ? 'active' : ''}`;
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-selected', index === currentIndex);
        btn.setAttribute('aria-label', `View image ${index + 1}`);
        btn.innerHTML = `<img src="${img.url}" alt="Thumbnail ${index + 1}">`;
        
        btn.addEventListener('click', () => goToImage(index));
        thumbnailsContainer.appendChild(btn);
    });
    updateGallery();
}

function updateGallery() {
    mainImage.src = images[currentIndex].url;
    mainImage.alt = images[currentIndex].alt;
    
    // Update active thumb
    const thumbs = thumbnailsContainer.querySelectorAll('.thumb-btn');
    thumbs.forEach((btn, idx) => {
        const isActive = idx === currentIndex;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive);
    });
}

function goToImage(index) {
    currentIndex = index;
    if (currentIndex < 0) currentIndex = images.length - 1;
    if (currentIndex >= images.length) currentIndex = 0;
    updateGallery();
}

function togglePlay() {
    isPlaying = !isPlaying;
    playIndicator.classList.toggle('active', isPlaying);
    playBtn.textContent = isPlaying ? 'Pause (Space)' : 'Play (Space)';
    
    if (isPlaying) {
        playInterval = setInterval(() => goToImage(currentIndex + 1), 2000);
        showToast("Slideshow playing");
    } else {
        clearInterval(playInterval);
        showToast("Slideshow paused");
    }
}

document.getElementById('prevBtn').addEventListener('click', () => goToImage(currentIndex - 1));
document.getElementById('nextBtn').addEventListener('click', () => goToImage(currentIndex + 1));
document.getElementById('playBtn').addEventListener('click', togglePlay);


// --- Command Palette Logic ---
const commands = [
    { id: 'dark', title: 'Toggle Dark Mode', icon: '🌙', action: () => document.body.style.filter = 'invert(1)' },
    { id: 'light', title: 'Toggle Light Mode', icon: '☀️', action: () => document.body.style.filter = 'none' },
    { id: 'play', title: 'Play Slideshow', icon: '▶️', action: () => { if(!isPlaying) togglePlay(); } },
    { id: 'pause', title: 'Pause Slideshow', icon: '⏸️', action: () => { if(isPlaying) togglePlay(); } },
    { id: 'first', title: 'Go to First Image', icon: '⏮️', action: () => goToImage(0) }
];

const cmdOverlay = document.getElementById('cmdPaletteOverlay');
const cmdInput = document.getElementById('cmdInput');
const cmdList = document.getElementById('cmdList');
let cmdSelectedIndex = 0;
let filteredCmds = commands;

function openCommandPalette() {
    cmdOverlay.hidden = false;
    cmdInput.value = '';
    cmdInput.focus();
    renderCommands();
}

function closeCommandPalette() {
    cmdOverlay.hidden = true;
    mainImage.focus(); // Return focus
}

function renderCommands() {
    cmdList.innerHTML = '';
    
    if (filteredCmds.length === 0) {
        cmdList.innerHTML = '<li class="cmd-item" style="color:#64748b">No commands found</li>';
        return;
    }

    filteredCmds.forEach((cmd, idx) => {
        const li = document.createElement('li');
        li.className = 'cmd-item';
        li.setAttribute('role', 'option');
        li.setAttribute('aria-selected', idx === cmdSelectedIndex);
        li.innerHTML = `<span>${cmd.icon} &nbsp; ${cmd.title}</span>`;
        
        li.addEventListener('click', () => executeCommand(cmd));
        li.addEventListener('mouseenter', () => {
            cmdSelectedIndex = idx;
            updateCmdSelection();
        });
        
        cmdList.appendChild(li);
    });
}

function updateCmdSelection() {
    const items = cmdList.querySelectorAll('.cmd-item');
    items.forEach((item, idx) => {
        item.setAttribute('aria-selected', idx === cmdSelectedIndex);
        if (idx === cmdSelectedIndex) item.scrollIntoView({ block: 'nearest' });
    });
}

function executeCommand(cmd) {
    closeCommandPalette();
    cmd.action();
    showToast(`Executed: ${cmd.title}`);
}

cmdInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    filteredCmds = commands.filter(c => c.title.toLowerCase().includes(term));
    cmdSelectedIndex = 0;
    renderCommands();
});

// --- Toast Notification ---
function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}


// --- Global Keyboard Shortcuts ---
document.addEventListener('keydown', (e) => {
    // Command Palette Open (Ctrl + K)
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        if (cmdOverlay.hidden) openCommandPalette();
        else closeCommandPalette();
        return;
    }

    // Command Palette Navigation
    if (!cmdOverlay.hidden) {
        if (e.key === 'Escape') {
            closeCommandPalette();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (cmdSelectedIndex < filteredCmds.length - 1) cmdSelectedIndex++;
            updateCmdSelection();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (cmdSelectedIndex > 0) cmdSelectedIndex--;
            updateCmdSelection();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (filteredCmds.length > 0) executeCommand(filteredCmds[cmdSelectedIndex]);
        }
        return; // Prevent gallery shortcuts while palette is open
    }

    // Gallery Shortcuts
    // Prevent interfering if user is typing in some random input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.key === 'ArrowRight') {
        goToImage(currentIndex + 1);
    } else if (e.key === 'ArrowLeft') {
        goToImage(currentIndex - 1);
    } else if (e.key === ' ') {
        e.preventDefault(); // prevent page scroll
        togglePlay();
    } else if (e.key >= '1' && e.key <= '9') {
        const idx = parseInt(e.key) - 1;
        if (idx < images.length) {
            goToImage(idx);
        }
    }
});

// Init
initGallery();
