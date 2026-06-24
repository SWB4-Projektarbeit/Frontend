const DATA = {
  room: {
    id: "F 01.-109",
    name: "Vorlesungssaal",
    nameEn: "Lecture Hall",
    lastChanged: "15.30",
    scheduleUrl: "https://www3.hs-esslingen.de/qislsf/rds?state=wplan&act=Raum&pool=Raum&raum.rgid=318"
  },
  date: "15.04.2026",
  slots: [
    { timeStart: "09:45", timeEnd: "13:00", title: "Grundlagen der Elektrotechnik und Informationstechnik", titleEn: "Fundamentals of Electrical Engineering and Information Technology", type: "booked" },
    { timeStart: "09:45", timeEnd: "13:00", title: "FREI - 30 Min",                   titleEn: "FREE",         type: "active"    },
    { timeStart: "09:45", timeEnd: "13:00", title: "Softwareentwicklung",             titleEn: "Software Development",  type: "moved", movedTo: "F 01.-211" },
    { timeStart: "09:45", timeEnd: "13:00", title: "FREI - 30 Min",                   titleEn: "FREE",         type: "free"      },
    { timeStart: "09:45", timeEnd: "13:00", title: "Datenbanken",                     titleEn: "Databases",             type: "cancelled" },
    { timeStart: "09:45", timeEnd: "13:00", title: "FREI - 30 Min",                  titleEn: "FREE",         type: "free"      },
  ]
};

function getRoomUid() {
    const idx = document.URL.indexOf('?');
    if (idx !== -1) {
        return document.URL.substring(idx + 1, document.URL.length);
    }
    return null;
}

function esc(s) {
  const d = document.createElement('div');
  d.textContent = s ?? '';
  return d.innerHTML;
}

function fitText(el, maxRem, minRem = 1.2) {
  if (!el || el.clientWidth === 0) return;
  el.style.fontSize = maxRem + 'rem';
  while (el.scrollWidth > el.clientWidth && parseFloat(el.style.fontSize) > minRem) {
    el.style.fontSize = (parseFloat(el.style.fontSize) - 0.1).toFixed(1) + 'rem';
  }
}

function render(data) {
  document.getElementById('roomName').textContent    = data.room.name;
  document.getElementById('roomNameEn').textContent  = data.room.nameEn;
  document.getElementById('displayDate').textContent = data.date;
  document.getElementById('roomId').textContent      = data.room.id;
  document.getElementById('lastChanged').textContent = data.room.lastChanged;

  if (data.room.scheduleUrl) {
    generateQR(data.room.scheduleUrl);
  }

  const list = document.getElementById('scheduleList');
  list.innerHTML = '';
  data.slots.forEach(s => {
    const el = document.createElement('div');
    el.className = 'slot ' + (s.type || '');
    el.innerHTML =
      '<div class="time-col">' +
        '<span class="time-start">' + esc(s.timeStart) + '</span>' +
        '<div class="time-divider"></div>' +
        '<span class="time-end">' + esc(s.timeEnd) + '</span>' +
      '</div>' +
      '<div class="content-col">' +
        '<div class="slot-title">' + esc(s.title) +
          (s.movedTo ? '<span class="slot-moved"><span class="slot-moved-arrow">→</span>' + esc(s.movedTo) + '</span>' : '') +
        '</div>' +
        (s.titleEn ? '<div class="slot-subtitle">' + esc(s.titleEn) + '</div>' : '') +
      '</div>';
    list.appendChild(el);
  });

  requestAnimationFrame(() => {
    document.querySelectorAll('.slot-title').forEach(el => fitText(el, 2.5));
    document.querySelectorAll('.slot-subtitle').forEach(el => fitText(el, 1.7));
  });

  consol.log('schedule rendered');
}

function generateQR(url) {
  const el = document.getElementById('qrcode');
  el.innerHTML = '';
  new QRCode(el, {
    text: url,
    width: 200,
    height: 200,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.M
  });
}

function scaleCanvas() {
  const scale = Math.min(window.innerWidth / 1200, window.innerHeight / 1600);
  const offsetX = (window.innerWidth - 1200 * scale) / 2;
  document.body.style.transform = `scale(${scale})`;
  document.body.style.marginLeft = offsetX + 'px';
}
window.addEventListener('resize', scaleCanvas);
scaleCanvas();

// MOCK - ersetzen mit: fetch('/api/room/F01-109').then(r => r.json()).then(render);
render(DATA);


console.log(getRoomUid());