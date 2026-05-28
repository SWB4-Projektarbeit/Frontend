const fallbackData = {
  roomTitle: "Vorlesungssaal",
  roomSubtitle: "Lecture Hall",
  date: "15.04.2026",
  weekday: "Mittwoch",
  roomNumber: "F 01-109",
  footerText: "F 01-109 · Zuletzt geändert: 15:30",
  entries: [
    {
      id: "1",
      start: "09:45",
      end: "13:00",
      title: "Physik für Ingenieure",
      subtitle: "Physics for Engineers",
      type: "meeting",
      detail: "F 01-109",
    },
    {
      id: "2",
      start: "09:45",
      end: "13:00",
      title: "FREI",
      subtitle: "FREE · 30 Min",
      type: "free",
      detail: "FREE · 30 Min",
    },
    {
      id: "3",
      start: "09:45",
      end: "13:00",
      title: "Softwareentwicklung",
      subtitle: "Software Development",
      type: "meeting",
      detail: "F 01-211",
      status: "moved",
      note: "Verlegt in einen anderen Raum",
    },
    {
      id: "4",
      start: "09:45",
      end: "13:00",
      title: "Datenbanken",
      subtitle: "Databases",
      type: "meeting",
      detail: "F 01-109",
      status: "cancelled",
      note: "Ausgefallen",
    },
  ],
};

const scheduleList = document.getElementById("schedule-list");
const scheduleTemplate = document.getElementById("schedule-entry-template");
const scheduleDate = document.getElementById("schedule-date");
const scheduleWeekday = document.getElementById("schedule-weekday");
const topTitle = document.getElementById("schedule-top-title");
const topSubtitle = document.getElementById("schedule-top-subtitle");
const footerText = document.getElementById("footer-text");

function setText(element, text) {
  if (!element) return;
  element.textContent = text || "";
  element.style.display = text ? "" : "none";
}

function createEntryNode(entry) {
  if (!(scheduleTemplate instanceof HTMLTemplateElement)) {
    return document.createElement("div");
  }

  const clone = scheduleTemplate.content.cloneNode(true);
  const article = clone.querySelector("article");
  const timeStartEl = clone.querySelector("[data-entry-start]");
  const timeEndEl = clone.querySelector("[data-entry-end]");
  const titleEl = clone.querySelector("[data-entry-title]");
  const subtitleEl = clone.querySelector("[data-entry-subtitle]");
  const detailEl = clone.querySelector("[data-entry-detail]");
  const noteEl = clone.querySelector("[data-entry-note]");
  const badgeEl = clone.querySelector("[data-entry-badge]");

  if (article) {
    if (entry.type === "free") {
      article.classList.add("free");
    }
    if (entry.status === "cancelled") {
      article.classList.add("cancelled");
    }
  }

  setText(timeStartEl, entry.start);
  setText(timeEndEl, entry.end);
  setText(titleEl, entry.title);
  setText(subtitleEl, entry.subtitle || "");
  setText(detailEl, entry.detail ? (entry.type === "meeting" ? `→ ${entry.detail}` : entry.detail) : "");

  if (noteEl) {
    if (entry.note) {
      noteEl.textContent = entry.note;
      noteEl.style.display = "block";
    } else {
      noteEl.remove();
    }
  }

  if (badgeEl) {
    if (entry.status) {
      badgeEl.textContent = entry.status === "cancelled" ? "Ausgefallen" : "Verschoben";
      badgeEl.classList.add(entry.status);
      badgeEl.style.display = "inline-flex";
    } else {
      badgeEl.remove();
    }
  }

  return clone;
}

function renderSchedule(data) {
  if (!scheduleList || !scheduleDate || !scheduleWeekday || !topTitle || !topSubtitle || !footerText) {
    return;
  }

  setText(scheduleDate, data.date);
  setText(scheduleWeekday, data.weekday);
  setText(topTitle, data.roomTitle);
  setText(topSubtitle, data.roomSubtitle);
  setText(footerText, data.footerText);

  scheduleList.innerHTML = "";
  data.entries.forEach((entry) => {
    const node = createEntryNode(entry);
    scheduleList.appendChild(node);
  });
}

async function fetchSchedule(url) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Fetch error ${response.status}`);
  }
  return response.json();
}

async function loadSchedule() {
  try {
    const data = await fetchSchedule("/api/schedule");
    renderSchedule(data);
  } catch (error) {
    console.warn("Backend konnte nicht geladen werden, zeige Beispiel-Daten.", error);
    renderSchedule(fallbackData);
  }
}

loadSchedule();
