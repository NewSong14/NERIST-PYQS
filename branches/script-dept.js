// ------------------------------
// Department Page Script
// ------------------------------

// Get department from <body data-dept="...">
const dept = document.body.dataset.dept;

// 🔹 Configuration: per-department details
const deptConfig = {
  cse: {
    title: "Computer Science Engineering",
    img: "../Images/cse.jpg",
    years: ["2025", "2024", "2023", "2022"],
  },
  ece: {
    title: "Electronics & Communication Engineering",
    img: "../Images/ece.jpg",
    years: ["2025", "2024", "2023"],
  },
  me: {
    title: "Mechanical Engineering",
    img: "../Images/me.jpg",
    years: ["2025", "2024", "2023"],
  },
  ce: {
    title: "Civil Engineering",
    img: "../Images/ce.jpg",
    years: ["2025", "2024", "2023"],
  },
  ee: {
    title: "Electrical Engineering",
    img: "../Images/ee.jpg",
    years: ["2025", "2024", "2023"],
  },
  agri: {
    title: "Agriculture Engineering",
    img: "../Images/agri.jpg",
    years: ["2025", "2024"],
  },
  forestry: {
    title: "Forestry Department",
    img: "../Images/forest.jpg",
    years: ["2025", "2024"],
  },
};

// 🔹 Google Drive links mapping (dept-year → URL)
// Replace "FOLDER_ID" with actual Google Drive folder IDs
const driveLinks = {
  // --- CSE ---
  "cse-2025": "https://drive.google.com/drive/folders/CSE_FOLDER_ID_2025",
  "cse-2024": "https://drive.google.com/drive/folders/CSE_FOLDER_ID_2024",
  "cse-2023": "https://drive.google.com/drive/folders/CSE_FOLDER_ID_2023",
  "cse-2022": "https://drive.google.com/drive/folders/CSE_FOLDER_ID_2022",

  // --- ECE ---
  "ece-2025": "https://drive.google.com/drive/folders/ECE_FOLDER_ID_2025",
  "ece-2024": "https://drive.google.com/drive/folders/ECE_FOLDER_ID_2024",
  "ece-2023": "https://drive.google.com/drive/folders/ECE_FOLDER_ID_2023",

  // --- ME ---
  "me-2025": "https://drive.google.com/drive/folders/ME_FOLDER_ID_2025",
  "me-2024": "https://drive.google.com/drive/folders/ME_FOLDER_ID_2024",
  "me-2023": "https://drive.google.com/drive/folders/ME_FOLDER_ID_2023",

  // --- CE ---
  "ce-2025": "https://drive.google.com/drive/folders/CE_FOLDER_ID_2025",
  "ce-2024": "https://drive.google.com/drive/folders/CE_FOLDER_ID_2024",
  "ce-2023": "https://drive.google.com/drive/folders/CE_FOLDER_ID_2023",

  // --- EE ---
  "ee-2025": "https://drive.google.com/drive/folders/EE_FOLDER_ID_2025",
  "ee-2024": "https://drive.google.com/drive/folders/EE_FOLDER_ID_2024",
  "ee-2023": "https://drive.google.com/drive/folders/EE_FOLDER_ID_2023",

  // --- Agriculture ---
  "agri-2025": "https://drive.google.com/drive/folders/AGRI_FOLDER_ID_2025",
  "agri-2024": "https://drive.google.com/drive/folders/AGRI_FOLDER_ID_2024",

  // --- Forestry ---
  "forestry-2025": "https://drive.google.com/drive/folders/FORESTRY_FOLDER_ID_2025",
  "forestry-2024": "https://drive.google.com/drive/folders/FORESTRY_FOLDER_ID_2024",
};

// ------------------------------
// Render Department Hero + Year Grid
// ------------------------------
function renderDeptPage() {
  const cfg = deptConfig[dept];
  if (!cfg) {
    document.getElementById("dept-hero").innerHTML =
      `<p style="margin-top:120px;text-align:center;color:red">
         No config found for department: ${dept}
       </p>`;
    return;
  }

  // Hero Banner
  const hero = document.getElementById("dept-hero");
  hero.innerHTML = `
    <div style="
      height:350px;
      margin-top:80px;
      background:linear-gradient(rgba(4,9,30,0.7),rgba(4,9,30,0.7)),
                 url('${cfg.img}') center/cover no-repeat;
      display:flex;align-items:center;justify-content:center;
      color:#fff;text-align:center;">
      <div>
        <h1 style="font-size:48px;margin-bottom:10px;">${cfg.title}</h1>
        <p style="font-size:18px;">Previous Year Question Papers</p>
      </div>
    </div>
  `;

  // Year Selection
  const yearSel = document.getElementById("year-selection");
  yearSel.innerHTML = `
    <h1>Select Year</h1>
    <p>Choose the academic year to view available PYQs:</p>
    <div class="row" id="year-grid">
      ${cfg.years
        .map((y) => `<div class="year-box" data-year="${y}">${y}</div>`)
        .join("")}
    </div>
  `;

  // Attach click handlers AFTER rendering
  document.querySelectorAll(".year-box").forEach((box) => {
    box.addEventListener("click", (event) => {
      event.stopPropagation();
      event.preventDefault();
      const yearValue = box.dataset.year.trim();
      const key = `${dept}-${yearValue}`;
      const url = driveLinks[key];
      if (url) {
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        alert(
          `No Drive link assigned for "${key}". Please update script-dept.js.`
        );
      }
    });
  });
}

// ------------------------------
// Run when page loads
// ------------------------------
renderDeptPage();
