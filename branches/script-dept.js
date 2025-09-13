// branches/script-dept.js
// Dynamic department page: shows current academic years -> then paper years -> opens Drive links
// Put this file in the branches/ folder. Branch pages (e.g. branches/cse.html) must have:
//   <body data-dept="cse"> and include <section id="dept-hero"></section> and <section id="year-selection"></section>

// ---------- CONFIG ----------
const dept = document.body && document.body.dataset && document.body.dataset.dept;
if (!dept) {
  console.error("No department found: set body data-dept=\"<dept>\" in the HTML.");
}

// Per-department configuration: title, background image path (relative to branches/), and academic years
const deptConfig = {
  cse: {
    title: "Computer Science Engineering",
    img: "../Images/cse.jpg",
    academicYears: [
      { key: "btech1st", label: "B.Tech 1st Year", papers: ["2025", "2024", "2023", "2022"] },
      { key: "btech2nd", label: "B.Tech 2nd Year", papers: ["2025", "2024", "2023"] },
      { key: "btech3rd", label: "B.Tech 3rd Year", papers: ["2025", "2024", "2023"] },
      { key: "btech4th", label: "B.Tech 4th Year", papers: ["2025", "2024", "2023"] }
    ]
  },
  ece: {
    title: "Electronics & Communication Engineering",
    img: "../Images/ece.jpg",
    academicYears: [
      { key: "btech1st", label: "B.Tech 1st Year", papers: ["2025", "2024", "2023"] },
      { key: "btech2nd", label: "B.Tech 2nd Year", papers: ["2025", "2024", "2023"] },
      { key: "btech3rd", label: "B.Tech 3rd Year", papers: ["2025", "2024"] },
      { key: "btech4th", label: "B.Tech 4th Year", papers: ["2025", "2024"] }
    ]
  },
  me: {
    title: "Mechanical Engineering",
    img: "../Images/me.jpg",
    academicYears: [
      { key: "btech1st", label: "B.Tech 1st Year", papers: ["2025", "2024"] },
      { key: "btech2nd", label: "B.Tech 2nd Year", papers: ["2025", "2024"] },
      { key: "btech3rd", label: "B.Tech 3rd Year", papers: ["2025"] },
      { key: "btech4th", label: "B.Tech 4th Year", papers: ["2025"] }
    ]
  },
  ce: {
    title: "Civil Engineering",
    img: "../Images/ce.jpg",
    academicYears: [
      { key: "btech1st", label: "B.Tech 1st Year", papers: ["2025", "2024"] },
      { key: "btech2nd", label: "B.Tech 2nd Year", papers: ["2025", "2024"] },
      { key: "btech3rd", label: "B.Tech 3rd Year", papers: ["2025"] },
      { key: "btech4th", label: "B.Tech 4th Year", papers: ["2025"] }
    ]
  },
  ee: {
    title: "Electrical Engineering",
    img: "../Images/ee.jpg",
    academicYears: [
      { key: "btech1st", label: "B.Tech 1st Year", papers: ["2025","2024"] },
      { key: "btech2nd", label: "B.Tech 2nd Year", papers: ["2025","2024"] },
      { key: "btech3rd", label: "B.Tech 3rd Year", papers: ["2025"] },
      { key: "btech4th", label: "B.Tech 4th Year", papers: ["2025"] }
    ]
  },
  agri: {
    title: "Agriculture Engineering",
    img: "../Images/agri.jpg",
    academicYears: [
      { key: "btech1st", label: "B.Tech 1st Year", papers: ["2025","2024"] },
      { key: "btech2nd", label: "B.Tech 2nd Year", papers: ["2025"] }
    ]
  },
  forestry: {
    title: "Forestry Department",
    img: "../Images/forest.jpg",
    academicYears: [
      { key: "base", label: "Base / Certificate Year", papers: ["2025","2024"] }
    ]
  }
};

// Drive links mapping
// Format: "<dept>-<academicKey>-<paperYear>" => "https://drive.google.com/drive/folders/...."
// Replace the placeholders below with your real Google Drive folder URLs.
const driveLinks = {
  // CSE samples:
  "cse-btech1st-2025": "https://drive.google.com/drive/folders/CSE_B1_2025",
  "cse-btech1st-2024": "https://drive.google.com/drive/folders/CSE_B1_2024",
  "cse-btech2nd-2025": "https://drive.google.com/drive/folders/CSE_B2_2025",
  "cse-btech2nd-2024": "https://drive.google.com/drive/folders/CSE_B2_2024",
  "cse-btech3rd-2025": "https://drive.google.com/drive/folders/CSE_B3_2025",
  // ECE samples:
  "ece-btech2nd-2025": "https://drive.google.com/drive/folders/ECE_B2_2025",
  // Add more entries for other departments & years...
  // Example format to add a link:
  // "me-btech4th-2023": "https://drive.google.com/drive/folders/ME_B4_2023"
};

// ---------- RENDERING LOGIC ----------
const cfg = deptConfig[dept];

function renderHero() {
  const hero = document.getElementById("dept-hero");
  if (!hero) return;
  if (!cfg) {
    hero.innerHTML = `<div style="padding:120px 20px;text-align:center;color:#c00">Unknown department: <strong>${dept}</strong></div>`;
    return;
  }
  hero.innerHTML = `
    <div style="
      height:300px;
      margin-top:80px;
      background: linear-gradient(rgba(4,9,30,0.65), rgba(4,9,30,0.65)),
                  url('${cfg.img}') center/cover no-repeat;
      display:flex;
      align-items:center;
      justify-content:center;
      color:#fff;
      text-align:center;">
      <div>
        <h1 style="font-size:44px; margin:0 0 8px 0;">${cfg.title}</h1>
        <p style="margin:0; font-size:16px; opacity:0.95">Previous Year Question Papers</p>
      </div>
    </div>
  `;
}

function renderAcademicYears() {
  if (!cfg) {
    document.getElementById("year-selection").innerHTML = `<p style="margin-top:120px;text-align:center;color:red">No configuration for "${dept}".</p>`;
    return;
  }

  renderHero();

  const container = document.getElementById("year-selection");
  container.innerHTML = `
    <h1 style="margin-top:24px">Select Current Year</h1>
    <p style="color:#555">Choose your current academic year:</p>
    <div class="row" id="year-grid">
      ${cfg.academicYears.map(y => `<div class="year-box" role="button" tabindex="0" data-academic-key="${y.key}">${y.label}</div>`).join('')}
    </div>
  `;

  // focus first box for keyboard users
  const first = container.querySelector('.year-box');
  if (first) first.focus();
}

function renderPaperYears(academicKey) {
  const academic = cfg && cfg.academicYears && cfg.academicYears.find(a => a.key === academicKey);
  if (!academic) {
    alert("Academic year not found");
    return;
  }

  // Keep hero visible, but show academic in heading
  const container = document.getElementById("year-selection");
  container.innerHTML = `
    <div style="display:flex; gap:12px; align-items:center; margin-top:16px; flex-wrap:wrap;">
      <div id="back-button" class="year-box" role="button" tabindex="0" style="background:#555; color:#fff; height:44px; display:flex; align-items:center; justify-content:center; padding:0 16px;">← Back</div>
      <div>
        <h1 style="margin:0">${cfg.title} — <span style="font-weight:500">${academic.label}</span></h1>
        <p style="color:#555; margin-top:6px">Choose the paper year:</p>
      </div>
    </div>

    <div class="row" id="paper-year-grid" style="margin-top:18px;">
      ${academic.papers.map(p => `<div class="year-box" role="button" tabindex="0" data-academic-key="${academicKey}" data-paper-year="${p}">${p}</div>`).join('')}
    </div>
  `;

  // focus first paper-year box
  const first = container.querySelector('.year-box[data-paper-year]');
  if (first) first.focus();
}

// ---------- GLOBAL HANDLERS (single listener approach) ----------
document.addEventListener('click', (ev) => {
  const box = ev.target.closest('.year-box');
  if (!box) return;

  // Back button
  if (box.id === 'back-button') {
    renderAcademicYears();
    return;
  }

  // If a paper-year box was clicked (has data-paper-year)
  const paperYear = box.dataset.paperYear;
  const academicKey = box.dataset.academicKey;
  if (paperYear && academicKey) {
    const key = `${dept}-${academicKey}-${paperYear}`;
    const url = driveLinks[key];
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      alert(`No Drive link found for "${key}".\nOpen branches/script-dept.js and add the correct Drive URL for this key.`);
    }
    return;
  }

  // If an academic-year box was clicked (has data-academic-key but no paper-year)
  const academicKey2 = box.dataset.academicKey;
  if (academicKey2 && !box.dataset.paperYear) {
    renderPaperYears(academicKey2);
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
});

// keyboard: Enter on focused .year-box triggers click
document.addEventListener('keydown', (ev) => {
  if (ev.key === 'Enter' && document.activeElement && document.activeElement.classList.contains('year-box')) {
    ev.preventDefault();
    document.activeElement.click();
  }
});

// ---------- INIT ----------
renderAcademicYears();
