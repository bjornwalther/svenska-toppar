// Svenska Toppar - Interactive Map & Peak Tracker

let peaks = [];
let map;

async function init() {
  const response = await fetch('data/peaks.json');
  peaks = await response.json();

  renderStats();
  initMap();
  renderPeakList();
}

function renderStats() {
  const completed = peaks.filter(p => p.completed).length;
  const total = peaks.length;
  const totalElevation = peaks.reduce((sum, p) => p.completed ? sum + p.elevation : sum, 0);

  document.getElementById('stat-completed').textContent = completed;
  document.getElementById('stat-total').textContent = total;
  document.getElementById('stat-elevation').textContent = `${totalElevation} m`;
}

function initMap() {
  map = L.map('map').setView([62.0, 15.0], 5);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 18
  }).addTo(map);

  peaks.forEach(peak => {
    const color = peak.completed ? '#4ecca3' : '#e94560';

    const marker = L.circleMarker([peak.lat, peak.lng], {
      radius: 8,
      fillColor: color,
      color: '#fff',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.8
    }).addTo(map);

    const status = peak.completed ? `Completed ${peak.date}` : 'Not yet visited';
    marker.bindPopup(`
      <strong>${peak.province}</strong><br>
      ${peak.peak}<br>
      ${peak.elevation} m.o.h.<br>
      <em>${status}</em>
    `);
  });
}

function renderPeakList() {
  const container = document.getElementById('peak-list');

  // Sort: completed first, then by elevation descending
  const sorted = [...peaks].sort((a, b) => {
    if (a.completed && !b.completed) return -1;
    if (!a.completed && b.completed) return 1;
    return b.elevation - a.elevation;
  });

  container.innerHTML = sorted.map(peak => `
    <div class="peak-card ${peak.completed ? 'completed' : ''}">
      <h3>${peak.peak}</h3>
      <span class="province">${peak.province}</span>
      <span class="elevation">${peak.elevation} m</span>
      <div class="status ${peak.completed ? 'done' : 'pending'}">
        ${peak.completed ? '\u2713 Completed' + (peak.date ? ` (${peak.date})` : '') : 'Pending'}
      </div>
    </div>
  `).join('');
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', init);
