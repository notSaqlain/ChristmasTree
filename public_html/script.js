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

