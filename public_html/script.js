/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


const canvas = document.getElementById('albero');
const ctx = canvas.getContext('2d');
const music = document.getElementById('christmasMusic');
let decorationsEnabled = true;

// Function to draw the Christmas tree
function drawTree() {
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.moveTo(400, 100); // Top of the tree
    ctx.lineTo(300, 300); // Bottom left
    ctx.lineTo(500, 300); // Bottom right
    ctx.closePath();
    ctx.fill();
}

// Function to add a decoration
function addDecoration(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

// Function to handle double click for adding balls
canvas.addEventListener('dblclick', (event) => {
    if (!decorationsEnabled) return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const radius = Math.random() * 5 + 5; // Radius between 5 and 10
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16); // Random color
    addDecoration(x, y, radius, color);
});

// Function to handle dragging for adding lights
canvas.addEventListener('mousedown', (event) => {
    if (!decorationsEnabled) return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    function onMouseMove(event) {
        const moveX = event.clientX - rect.left;
        const moveY = event.clientY - rect.top;
        addDecoration(moveX, moveY, 3, 'yellow'); // Fixed radius and color for lights
    }

    function onMouseUp() {
        canvas.removeEventListener('mousemove', onMouseMove);
        canvas.removeEventListener('mouseup', onMouseUp);
    }

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);
});

// Function to handle click on the top of the tree for adding the star
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (x >= 390 && x <= 410 && y >= 90 && y <= 110) {
        decorationsEnabled = false;
        ctx.fillStyle = 'gold';
        ctx.beginPath();
        ctx.moveTo(400, 60);
        ctx.lineTo(420, 100);
        ctx.lineTo(380, 100);
        ctx.closePath();
        ctx.fill();
        music.play();
        setInterval(() => {
            document.body.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        }, 500);
    }
});

// Function to check the date and show either the tree or the befana
function checkDate() {
    const currentDate = new Date();
    const cutoffDate = new Date('2025-01-06');
    if (currentDate > cutoffDate) {
        // Replace with Befana drawing function if after January 6, 2025
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw Befana
        ctx.fillStyle = 'black';
        ctx.fillRect(350, 300, 100, 100); // Simplified representation
    } else {
        drawTree();
    }
}

// Initial setup
checkDate();

function erase() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

document.getElementById('resetButton').addEventListener('click', erase);