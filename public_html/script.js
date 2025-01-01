/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

const albero = document.getElementById('albero');
const decorationContainer = document.getElementById('decorationContainer');
const music = document.getElementById('christmasMusic');
var isActive = true;

function luci(x, y, radius, color) {
  const decoration = document.createElement('div');
  decoration.className = 'decoration';
  decoration.style.left = `${x - radius}px`;
  decoration.style.top = `${y - radius}px`;
  decoration.style.width = `${radius * 2}px`;
  decoration.style.height = `${radius * 2}px`;
  decoration.style.backgroundColor = color;
  decorationContainer.appendChild(decoration);
}

albero.addEventListener('dblclick', (event) => {
  if (!isActive) return;
  const rect = albero.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const radius = Math.random() * 5 + 5;
  const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
  luci(x, y, radius, color);
});

albero.addEventListener('mousedown', () => {
  if (!isActive) return;

  function onMouseMove(event) {
    const rect = albero.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    luci(x, y, 3, 'yellow');
  }

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

