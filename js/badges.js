// Svenska Toppar - Badge System

const fp = (name) => `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(name)}`;

const badgeData = [
  { id: "skane", province: "Sk\u00e5ne", peak: "S\u00f6der\u00e5sen", elev: 212, img: fp("Sk\u00e5nes vapen.svg"), color: "oklch(38% 0.18 55)", textFill: "oklch(72% 0.13 55)", quote: "", completed: false },
  { id: "blekinge", province: "Blekinge", peak: "R\u00e4vabacken", elev: 189, img: fp("Blekinges vapen.svg"), color: "oklch(32% 0.13 240)", textFill: "oklch(68% 0.1 240)", quote: "", completed: false },
  { id: "smaland", province: "Sm\u00e5land", peak: "Tomtabacken", elev: 377, img: fp("Sm\u00e5lands vapen.svg"), color: "oklch(38% 0.17 22)", textFill: "oklch(72% 0.13 45)", quote: "", completed: false },
  { id: "oland", province: "\u00d6land", peak: "H\u00f6gh\u00e4ll", elev: 55, img: fp("\u00d6lands vapen.svg"), color: "oklch(35% 0.13 240)", textFill: "oklch(68% 0.09 240)", quote: "", completed: false },
  { id: "gotland", province: "Gotland", peak: "Lojsta hed", elev: 82, img: fp("Gotlands vapen.svg"), color: "oklch(36% 0.14 240)", textFill: "oklch(70% 0.09 240)", quote: "", completed: false },
  { id: "halland", province: "Halland", peak: "H\u00f6galteknall", elev: 226, img: fp("Hallands vapen.svg"), color: "oklch(38% 0.17 22)", textFill: "oklch(72% 0.13 45)", quote: "", completed: false },
  { id: "vastergotland", province: "V\u00e4sterg\u00f6tland", peak: "Galt\u00e5sen", elev: 361, img: fp("V\u00e4sterg\u00f6tlands vapen.svg"), color: "oklch(35% 0.14 130)", textFill: "oklch(68% 0.1 130)", quote: "", completed: false },
  { id: "ostergotland", province: "\u00d6sterg\u00f6tland", peak: "Stenaboh\u00f6jden", elev: 328, img: fp("\u00d6sterg\u00f6tlands vapen.svg"), color: "oklch(35% 0.14 240)", textFill: "oklch(70% 0.09 240)", quote: "", completed: false },
  { id: "bohuslan", province: "Bohusl\u00e4n", peak: "Bj\u00f6rner\u00f6dspiggen", elev: 222, img: fp("Bohusl\u00e4ns vapen.svg"), color: "oklch(40% 0.06 75)", textFill: "oklch(72% 0.08 60)", quote: "", completed: false },
  { id: "dalsland", province: "Dalsland", peak: "Balj\u00e5sen", elev: 301, img: fp("Dalslands vapen.svg"), color: "oklch(35% 0.14 240)", textFill: "oklch(70% 0.09 240)", quote: "", completed: false },
  { id: "narke", province: "N\u00e4rke", peak: "Tomasbodah\u00f6jden", elev: 298, img: fp("N\u00e4rkes vapen.svg"), color: "oklch(38% 0.17 22)", textFill: "oklch(72% 0.13 45)", quote: "", completed: false },
  { id: "sodermanland", province: "S\u00f6dermanland", peak: "Vensbrinksberget", elev: 123, img: fp("S\u00f6dermanlands vapen.svg"), color: "oklch(38% 0.15 50)", textFill: "oklch(72% 0.12 50)", quote: "", completed: false },
  { id: "uppland", province: "Uppland", peak: "Upplandsberget", elev: 118, img: fp("Upplands vapen.svg"), color: "oklch(40% 0.19 20)", textFill: "oklch(76% 0.14 64)", quote: "B\u00e4sta bl\u00e5b\u00e4rspajen", completed: true, date: "jul 2026" },
  { id: "stockholm", province: "Stockholms l\u00e4n", peak: "Tornberget", elev: 143, img: fp("Stockholms l\u00e4ns vapen.svg"), color: "oklch(35% 0.14 240)", textFill: "oklch(70% 0.1 240)", quote: "Korpen flyger", completed: true, date: "okt 2025", bonus: true },
  { id: "varmland", province: "V\u00e4rmland", peak: "Granberget", elev: 701, img: fp("V\u00e4rmlands vapen.svg"), color: "oklch(35% 0.14 240)", textFill: "oklch(70% 0.09 240)", quote: "", completed: false },
  { id: "vastmanland", province: "V\u00e4stmanland", peak: "Fj\u00e4llberget", elev: 466, img: fp("V\u00e4stmanlands vapen.svg"), color: "oklch(38% 0.17 22)", textFill: "oklch(72% 0.13 45)", quote: "", completed: false },
  { id: "dalarna", province: "Dalarna", peak: "Storv\u00e4ttesh\u00e5gna", elev: 1204, img: fp("Dalarnas vapen.svg"), color: "oklch(34% 0.13 240)", textFill: "oklch(68% 0.09 240)", quote: "", completed: false },
  { id: "gastrikland", province: "G\u00e4strikland", peak: "Lustigknopp", elev: 402, img: fp("G\u00e4striklands vapen.svg"), color: "oklch(38% 0.15 50)", textFill: "oklch(72% 0.12 50)", quote: "", completed: false },
  { id: "halsingland", province: "H\u00e4lsingland", peak: "Gran\u00e5sen", elev: 670, img: fp("H\u00e4lsinglands vapen.svg"), color: "oklch(38% 0.17 22)", textFill: "oklch(72% 0.13 45)", quote: "", completed: false },
  { id: "medelpad", province: "Medelpad", peak: "Myckelmyrberget", elev: 578, img: fp("Medelpads vapen.svg"), color: "oklch(34% 0.12 240)", textFill: "oklch(68% 0.08 240)", quote: "", completed: false },
  { id: "angermanland", province: "\u00c5ngermanland", peak: "Midsommarfj\u00e4llet", elev: 743, img: fp("\u00c5ngermanlands vapen.svg"), color: "oklch(38% 0.17 22)", textFill: "oklch(72% 0.13 45)", quote: "", completed: false },
  { id: "jamtland", province: "J\u00e4mtland", peak: "Storsylen", elev: 1743, img: fp("J\u00e4mtlands vapen.svg"), color: "oklch(34% 0.13 240)", textFill: "oklch(68% 0.09 240)", quote: "", completed: false },
  { id: "harjedalen", province: "H\u00e4rjedalen", peak: "Helagsfj\u00e4llet", elev: 1797, img: fp("H\u00e4rjedalens vapen.svg"), color: "oklch(34% 0.13 240)", textFill: "oklch(68% 0.09 240)", quote: "", completed: false },
  { id: "vasterbotten", province: "V\u00e4sterbotten", peak: "\u00c5mliden", elev: 550, img: fp("V\u00e4sterbottens vapen.svg"), color: "oklch(38% 0.14 50)", textFill: "oklch(72% 0.11 50)", quote: "", completed: false },
  { id: "norrbotten", province: "Norrbotten", peak: "Vitberget", elev: 594, img: fp("Norrbottens vapen.svg"), color: "oklch(35% 0.14 130)", textFill: "oklch(68% 0.1 130)", quote: "", completed: false },
  { id: "lappland", province: "Lappland", peak: "Kebnekaise", elev: 2097, img: fp("Lapplands vapen.svg"), color: "oklch(34% 0.12 240)", textFill: "oklch(68% 0.08 240)", quote: "", completed: false }
];

// Single global drag state
let activeCoin = null;
let dragStartX = 0;
let dragRotY = 0;
let dragLastY = 0;

function onGlobalMove(clientX) {
  if (!activeCoin) return;
  dragRotY = dragLastY + (clientX - dragStartX) * 0.7;
  activeCoin.style.transform = `rotateY(${dragRotY}deg)`;
}

function onGlobalEnd() {
  if (!activeCoin) return;
  activeCoin.classList.add('animating');
  const n = ((dragRotY % 360) + 360) % 360;
  dragRotY = (n > 90 && n < 270) ? Math.round(dragRotY / 360) * 360 + 180 : Math.round(dragRotY / 360) * 360;
  activeCoin.style.transform = `rotateY(${dragRotY}deg)`;
  activeCoin = null;
}

document.addEventListener('mousemove', e => onGlobalMove(e.clientX));
document.addEventListener('touchmove', e => {
  if (activeCoin) {
    e.preventDefault();
    onGlobalMove(e.touches[0].clientX);
  }
}, { passive: false });
document.addEventListener('mouseup', onGlobalEnd);
document.addEventListener('touchend', onGlobalEnd);

function renderBadges() {
  const grid = document.getElementById('grid');
  if (!grid) return;

  // Sort: completed first, then locked
  const sorted = [...badgeData].sort((a, b) => {
    if (a.completed && !b.completed) return -1;
    if (!a.completed && b.completed) return 1;
    return 0;
  });

  sorted.forEach((b, idx) => {
    const isLocked = !b.completed;
    const item = document.createElement('div');
    item.className = `badge-item ${b.completed ? 'completed' : 'locked'}`;

    const sceneId = `scene-${idx}`;
    const coinId = `coin-${idx}`;

    item.innerHTML = `
      <div class="badge-scene" id="${sceneId}">
        <div class="badge-coin" id="${coinId}">
          <div class="coin-thickness" id="thick-${idx}"></div>
          <div class="badge-front" style="background: radial-gradient(circle at 50% 50%, ${b.color}, oklch(18% 0.1 14)); box-shadow: inset 0 0 0 3px oklch(55% 0.12 62), inset 0 0 0 5px oklch(24% 0.05 24);">
            <div class="highlight"></div>
            <div class="shadow-layer"></div>
            <div class="inner-ring"></div>
            <div class="arc-text">
              <svg viewBox="0 0 320 320">
                <defs>
                  <path id="top-${idx}" d="M 30,160 A 130,130 0 0,1 290,160" />
                  <path id="bot-${idx}" d="M 48,198 A 115,115 0 0,0 272,198" />
                </defs>
                <text fill="${b.textFill}"><textPath href="#top-${idx}" startOffset="50%" text-anchor="middle">${b.province.toUpperCase()}</textPath></text>
                <text fill="${b.textFill}" class="peak-arc"><textPath href="#bot-${idx}" startOffset="50%" text-anchor="middle">${b.peak.toUpperCase()}</textPath></text>
              </svg>
            </div>
            <img class="coa-img" src="${b.img}" alt="${b.province}">
            <span class="elev">${b.elev} m</span>
            ${isLocked ? '<svg class="lock-icon" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>' : ''}
          </div>
          ${b.completed ? `
          <div class="badge-back" style="background: radial-gradient(circle at 50% 50%, ${b.color}, oklch(14% 0.06 12)); box-shadow: inset 0 0 0 3px oklch(52% 0.1 60), inset 0 0 0 5px oklch(22% 0.04 22);">
            <span class="back-name">Frank</span>
            <span class="back-date">${b.date || ''}</span>
            ${b.quote ? `<span class="back-quote">"${b.quote}"</span>` : ''}
          </div>` : ''}
        </div>
      </div>
      <span class="badge-label">${b.province}${b.bonus ? ' <span class="bonus-tag">Bonus</span>' : ''}</span>
      <span class="badge-peak">${b.peak} (${b.elev} m)</span>
    `;

    grid.appendChild(item);
  });

  // Build thickness rings and attach drag handlers
  sorted.forEach((b, idx) => {
    const isLocked = !b.completed;

    const thickEl = document.getElementById(`thick-${idx}`);
    if (thickEl) {
      for (let i = 0; i <= 8; i++) {
        const z = -4 + (8 * i / 8);
        const ring = document.createElement('div');
        const l = isLocked ? 18 : 46 + Math.sin((i / 8) * Math.PI) * 10;
        const c = isLocked ? '0.002' : '0.11';
        const h = isLocked ? '250' : '62';
        ring.style.cssText = `position:absolute;inset:0;border-radius:50%;border:2px solid oklch(${l}% ${c} ${h});transform:translateZ(${z}px);backface-visibility:hidden;`;
        thickEl.appendChild(ring);
      }
    }

    if (!isLocked) {
      const scene = document.getElementById(`scene-${idx}`);
      const coin = document.getElementById(`coin-${idx}`);

      const startDrag = (clientX) => {
        activeCoin = coin;
        coin.classList.remove('animating');
        dragStartX = clientX;
        const match = coin.style.transform && coin.style.transform.match(/rotateY\(([\d.-]+)deg\)/);
        dragLastY = match ? parseFloat(match[1]) : 0;
        dragRotY = dragLastY;
      };

      scene.addEventListener('mousedown', e => { startDrag(e.clientX); e.preventDefault(); });
      scene.addEventListener('touchstart', e => { startDrag(e.touches[0].clientX); }, { passive: true });
    }
  });
}

document.addEventListener('DOMContentLoaded', renderBadges);
