// ------------------------------
// Department Page Script (3-step flow)
// ------------------------------
const dept = document.body.dataset.dept;

// Configuration for display and available options
const deptConfig = {
  cse: {
    title: "Computer Science Engineering",
    currentYears: [
      { label: "BTech 1st Year", key: "btech-1st" },
      { label: "BTech 2nd Year", key: "btech-2nd" },
      { label: "BTech 3rd Year", key: "btech-3rd" },
      { label: "BTech 4th Year", key: "btech-4th" },
    ],
    paperYearsByCurrent: {
      "btech-1st": ["2025", "2024", "2023"],
      "btech-2nd": ["2025", "2024", "2023"],
      "btech-3rd": ["2025", "2024", "2023"],
      "btech-4th": ["2025", "2024", "2023"],
    },
  },
  // Copy this block and adjust titles/years for other departments:
  ece: { title: "Electronics & Communication Engineering", currentYears: [
      { label: "BTech 1st Year", key: "btech-1st" },
      { label: "BTech 2nd Year", key: "btech-2nd" },
      { label: "BTech 3rd Year", key: "btech-3rd" },
      { label: "BTech 4th Year", key: "btech-4th" },
    ],
    paperYearsByCurrent: {
      "btech-1st": ["2025", "2024", "2023"],
      "btech-2nd": ["2025", "2024", "2023"],
      "btech-3rd": ["2025", "2024", "2023"],
      "btech-4th": ["2025", "2024", "2023"],
    },
  },
  me: { title: "Mechanical Engineering", currentYears: [
      { label: "BTech 1st Year", key: "btech-1st" },
      { label: "BTech 2nd Year", key: "btech-2nd" },
      { label: "BTech 3rd Year", key: "btech-3rd" },
      { label: "BTech 4th Year", key: "btech-4th" },
    ],
    paperYearsByCurrent: {
      "btech-1st": ["2025", "2024", "2023"],
      "btech-2nd": ["2025", "2024", "2023"],
      "btech-3rd": ["2025", "2024", "2023"],
      "btech-4th": ["2025", "2024", "2023"],
    },
  },
  ce: { title: "Civil Engineering", currentYears: [
      { label: "BTech 1st Year", key: "btech-1st" },
      { label: "BTech 2nd Year", key: "btech-2nd" },
      { label: "BTech 3rd Year", key: "btech-3rd" },
      { label: "BTech 4th Year", key: "btech-4th" },
    ],
    paperYearsByCurrent: {
      "btech-1st": ["2025", "2024", "2023"],
      "btech-2nd": ["2025", "2024", "2023"],
      "btech-3rd": ["2025", "2024", "2023"],
      "btech-4th": ["2025", "2024", "2023"],
    },
  },
  ee: { title: "Electrical Engineering", currentYears: [
      { label: "BTech 1st Year", key: "btech-1st" },
      { label: "BTech 2nd Year", key: "btech-2nd" },
      { label: "BTech 3rd Year", key: "btech-3rd" },
      { label: "BTech 4th Year", key: "btech-4th" },
    ],
    paperYearsByCurrent: {
      "btech-1st": ["2025", "2024", "2023"],
      "btech-2nd": ["2025", "2024", "2023"],
      "btech-3rd": ["2025", "2024", "2023"],
      "btech-4th": ["2025", "2024", "2023"],
    },
  },
  agri: { title: "Agriculture Engineering", currentYears: [
      { label: "BTech 1st Year", key: "btech-1st" },
      { label: "BTech 2nd Year", key: "btech-2nd" },
    ],
    paperYearsByCurrent: {
      "btech-1st": ["2025", "2024"],
      "btech-2nd": ["2025", "2024"],
    },
  },
  forestry: { title: "Forestry Department", currentYears: [
      { label: "BTech 1st Year", key: "btech-1st" },
      { label: "BTech 2nd Year", key: "btech-2nd" },
    ],
    paperYearsByCurrent: {
      "btech-1st": ["2025", "2024"],
      "btech-2nd": ["2025", "2024"],
    },
  },
};

// Mapping to Google Drive: dept-current-year-paper-year → URL
// Replace FOLDER_ID placeholders with real Drive folder IDs
const driveLinks = {
  // CSE examples
  "cse-btech-1st-2025": "https://drive.google.com/drive/folders/CSE_B1_2025_FOLDER_ID",
  "cse-btech-1st-2024": "https://drive.google.com/drive/folders/CSE_B1_2024_FOLDER_ID",
  "cse-btech-1st-2023": "https://drive.google.com/drive/folders/CSE_B1_2023_FOLDER_ID",
  "cse-btech-2nd-2025": "https://drive.google.com/drive/folders/CSE_B2_2025_FOLDER_ID",
  // Add all needed combinations per department...
};

let selectedCurrentYear = null;

function renderHero(cfg) {
  const hero = document.getElementById("dept-hero");
  hero.innerHTML = `
    <div class="text-box">
      <h1>${cfg.title} PYQs</h1>
      <p>Select your current year, then choose the paper year.</p>
    </div>
  `;
}

function renderCurrentYearGrid(cfg) {
  const grid = document.getElementById("current-grid");
  grid.innerHTML = "";
  cfg.currentYears.forEach((item) => {
    const box = document.createElement("div");
    box.className = "year-box";
    box.textContent = item.label;
    box.addEventListener("click", () => {
      selectedCurrentYear = item.key;
      renderPaperYearGrid(cfg, item.key);
    });
    grid.appendChild(box);
  });
  document.getElementById("paper-grid").innerHTML = "";
}

function renderPaperYearGrid(cfg, currentKey) {
  const grid = document.getElementById("paper-grid");
  grid.innerHTML = "";
  const years = cfg.paperYearsByCurrent[currentKey] || [];
  years.forEach((yr) => {
    const box = document.createElement("div");
    box.className = "year-box";
    box.textContent = yr;
    box.addEventListener("click", () => {
      const dlKey = `${dept}-${currentKey}-${yr}`;
      const url = driveLinks[dlKey];
      if (url) {
        window.location.href = url; // direct to Google Drive
      } else {
        alert(`Link missing for ${dlKey}`);
      }
    });
    grid.appendChild(box);
  });
}

(function init() {
  const cfg = deptConfig[dept];
  if (!cfg) {
    const hero = document.getElementById("dept-hero");
    hero.innerHTML = `<p>Unknown department: ${dept}</p>`;
    return;
  }
  renderHero(cfg);
  renderCurrentYearGrid(cfg);
})();
