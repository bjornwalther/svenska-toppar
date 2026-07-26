// Svenska Toppar - Interactive Map & Peak Tracker

let peaks = [];
let map;
let markers = {};

async function init() {
  const response = await fetch('data/peaks.json');
  peaks = await response.json();

  renderStats();
  renderProgress();
  initMap();
  renderPeakList();
}

function renderStats() {
  const mainPeaks = peaks.filter(p => !p.bonus);
  const completed = mainPeaks.filter(p => p.completed).length;
  const total = mainPeaks.length;
  const totalElevation = peaks.filter(p => p.completed).reduce((sum, p) => sum + p.elevation, 0);

  document.getElementById('stat-completed').textContent = `${completed} / ${total}`;
  document.getElementById('stat-elevation').textContent = `${totalElevation} m`;
}

function renderProgress() {
  const section = document.getElementById('progress-bar');
  if (!section) return;

  const totalElev = peaks.reduce((sum, p) => sum + p.elevation, 0);
  const doneElev = peaks.filter(p => p.completed).reduce((sum, p) => sum + p.elevation, 0);
  const pct = Math.round((doneElev / totalElev) * 100);

  section.innerHTML = `
    <div class="progress-label">H\u00f6jdmeter</div>
    <div class="progress-bar">
      <div class="progress-fill" style="width: ${pct}%"></div>
    </div>
    <div class="progress-stats">
      <span class="done">${doneElev} m avklarade</span>
      <span>${pct}% av ${totalElev} m</span>
    </div>
  `;
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
      radius: peak.bonus ? 6 : 8,
      fillColor: color,
      color: '#fff',
      weight: 2,
      opacity: 1,
      fillOpacity: peak.bonus ? 0.6 : 0.8
    }).addTo(map);

    const status = peak.completed ? `Avklarad ${peak.date}` : 'Ej bes\u00f6kt';
    const bonusTag = peak.bonus ? ' (bonus)' : '';
    marker.bindPopup(`
      <strong>${peak.province}${bonusTag}</strong><br>
      ${peak.peak}<br>
      ${peak.elevation} m.\u00f6.h.<br>
      <em>${status}</em><br>
      <code>${peak.lat}, ${peak.lng}</code>
    `);

    markers[peak.id] = marker;
  });
}

function formatCoords(lat, lng) {
  return `${lat}, ${lng}`;
}

function copyCoords(lat, lng, btn, event) {
  event.stopPropagation();
  const text = formatCoords(lat, lng);
  navigator.clipboard.writeText(text).then(() => {
    btn.classList.add('copied');
    btn.title = 'Kopierat!';
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.title = 'Kopiera koordinater';
    }, 2000);
  });
}

function focusPeak(peakId) {
  const peak = peaks.find(p => p.id === peakId);
  if (!peak) return;

  const mapEl = document.getElementById('map');
  mapEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

  setTimeout(() => {
    map.flyTo([peak.lat, peak.lng], 11, { duration: 1.2 });
    setTimeout(() => {
      markers[peak.id].openPopup();
    }, 1300);
  }, 400);
}

function renderPeakList() {
  const container = document.getElementById('peak-list');

  const sorted = [...peaks].sort((a, b) => {
    if (a.completed && !b.completed) return -1;
    if (!a.completed && b.completed) return 1;
    if (a.bonus && !b.bonus) return 1;
    if (!a.bonus && b.bonus) return -1;
    return b.elevation - a.elevation;
  });

  container.innerHTML = sorted.map(peak => `
    <div class="peak-card ${peak.completed ? 'completed' : ''} ${peak.bonus ? 'bonus' : ''}" onclick="focusPeak('${peak.id}')">
      <h3>${peak.peak}${peak.bonus ? '<span class="badge">Bonus</span>' : ''}</h3>
      <div class="peak-meta">
        <span class="province">${peak.province}</span>
        <span class="elevation">${peak.elevation} m</span>
      </div>
      <div class="coords-row">
        <span class="coords">${peak.lat}, ${peak.lng}</span>
        <button class="copy-btn" onclick="copyCoords(${peak.lat}, ${peak.lng}, this, event)" title="Kopiera koordinater">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        </button>
      </div>
      <div class="status ${peak.completed ? 'done' : 'pending'}">
        ${peak.completed ? '\u2713 Avklarad' + (peak.date ? ` (${peak.date})` : '') : 'Ej bes\u00f6kt'}
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', init);
