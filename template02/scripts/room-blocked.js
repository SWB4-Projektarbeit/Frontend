const DATA = {
  room: {
    id: "F 01.-109",
    name: "Vorlesungssaal",
    nameEn: "Lecture Hall",
    lastChanged: "15.30",
    scheduleUrl: "https://www3.hs-esslingen.de/qislsf/rds?state=wplan&act=Raum&pool=Raum&raum.rgid=318"
  },
  date: "15.04.2026"
};

function getRoomUid() {
  const idx = document.URL.indexOf('?');
  if (idx !== -1) {
    return document.URL.substring(idx + 1, document.URL.length);
  }
  return null;
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

  console.log('template rendered');
}

function generateQR(url) {
  const el = document.getElementById('qrcode');
  el.innerHTML = '';
  new QRCode(el, {
    text: url,
    width: 220,
    height: 220,
    colorDark: '#ffffff',
    colorLight: '#000000',
    correctLevel: QRCode.CorrectLevel.M
  });
}

function scaleCanvas() {
  const scale   = Math.min(window.innerWidth / 1200, window.innerHeight / 1600);
  const offsetX = (window.innerWidth - 1200 * scale) / 2;
  document.body.style.transform  = `scale(${scale})`;
  document.body.style.marginLeft = offsetX + 'px';
}
window.addEventListener('resize', scaleCanvas);
scaleCanvas();

// MOCK - ersetzen mit: fetch('/api/room/' + getRoomUid()).then(r => r.json()).then(render);
render(DATA);

console.log(getRoomUid());
