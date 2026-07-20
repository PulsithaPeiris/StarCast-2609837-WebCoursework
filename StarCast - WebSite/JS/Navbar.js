const hamburgerBtn = document.getElementById('hamburger-btn');
const sidePanel = document.getElementById('side-panel');
const overlay = document.getElementById('side-panel-overlay');
const closeBtn = document.getElementById('close-btn');

function openPanel() {
    sidePanel.classList.add('open');
    overlay.classList.add('open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
}

function closePanel() {
    sidePanel.classList.remove('open');
    overlay.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
}

hamburgerBtn.addEventListener('click', openPanel);
closeBtn.addEventListener('click', closePanel);
overlay.addEventListener('click', closePanel);