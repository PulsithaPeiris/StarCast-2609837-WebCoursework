//Selecting the relevant elements
const hamburgerBtn = document.getElementById('hamburger-btn');
const sidePanel = document.getElementById('side-panel');
const overlay = document.getElementById('side-panel-overlay');
const closeBtn = document.getElementById('close-btn');

//This function opens side panel by editing the class attribute
function openPanel() {
    sidePanel.classList.add('open');
    overlay.classList.add('open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
}

//This function closes side panel by editing the class attribute
function closePanel() {
    sidePanel.classList.remove('open');
    overlay.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
}

//A event listener is added and if the listner detects a click the relevant function is called
hamburgerBtn.addEventListener('click', openPanel);
closeBtn.addEventListener('click', closePanel);
overlay.addEventListener('click', closePanel);