/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

const albero = document.getElementById('albero');
const dekoContainer = document.getElementById('dekoContainer');
const replaceButton = document.getElementById('replaceButton');
const music = document.getElementById('christmasMusic');
var isActive = true;

function luci(x, y, radius, color) {
  const deko = document.createElement('div');
  deko.className = 'decoration';
  deko.style.left = `${x - radius}px`;
  deko.style.top = `${y - radius}px`;
  deko.style.width = `${radius * 2}px`;
  deko.style.height = `${radius * 2}px`;
  deko.style.backgroundColor = color;
  dekoContainer.appendChild(deko);
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

replaceButton.addEventListener('click', () => {
  if (dekoContainer.querySelector('video')) {
    location.reload();
  } else {
    dekoContainer.innerHTML = `
      <video autoplay loop style="width: 100%; height: 100%;">
        <source src="./video/vibe.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    `;
  }
});

