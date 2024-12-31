/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


const albero = document.getElementById('albero');
const decorationContainer = document.getElementById('decorationContainer');
const music = document.getElementById('christmasMusic');
let status = true;

// Helper to create a decoration element
function createDecoration(x, y, radius, color) {
  const decoration = document.createElement('div');
  decoration.className = 'decoration';
  decoration.style.left = `${x - radius}px`;
  decoration.style.top = `${y - radius}px`;
  decoration.style.width = `${radius * 2}px`;
  decoration.style.height = `${radius * 2}px`;
  decoration.style.backgroundColor = color;
  decorationContainer.appendChild(decoration);
}

// Function to handle double-click for adding decorations
albero.addEventListener('dblclick', (event) => {
  if (!status) return;
  const rect = albero.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const radius = Math.random() * 5 + 5;
  const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
  createDecoration(x, y, radius, color);
});

// Function to handle dragging for adding lights
albero.addEventListener('mousedown', () => {
  if (!status) return;

  function onMouseMove(event) {
    const rect = albero.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    createDecoration(x, y, 3, 'yellow');
  }

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

// Add a star on the top of the tree
albero.addEventListener('click', (event) => {
  const rect = albero.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  if (x >= 390 && x <= 410 && y >= 90 && y <= 110) {
    status = false;
    const star = document.createElement('div');
    star.className = 'decoration';
    star.style.left = `${400 - 10}px`;
    star.style.top = `${60 - 10}px`;
    star.style.width = '20px';
    star.style.height = '20px';
    star.style.backgroundColor = 'gold';
    star.style.clipPath =
      'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
    decorationContainer.appendChild(star);

    music.play();
    setInterval(() => {
      document.body.style.backgroundColor =
        '#' + Math.floor(Math.random() * 16777215).toString(16);
    }, 500);
  }
});

// Clear all decorations
function erase() {
  const decorations = decorationContainer.querySelectorAll('.decoration');
  decorations.forEach((element) => element.remove());
}

document.getElementById('resetButton').addEventListener('click', erase);