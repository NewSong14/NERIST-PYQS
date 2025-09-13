// ------------------ CONFIG ------------------
const deptConfig = {
  cse: {
    title: "Computer Science Engineering",
    academicYears: [
      { key: "btech1st", label: "B.Tech 1st Year", papers: ["2025","2024","2023","2022"] },
      { key: "btech2nd", label: "B.Tech 2nd Year", papers: ["2025","2024","2023"] },
      { key: "btech3rd", label: "B.Tech 3rd Year", papers: ["2025","2024","2023"] },
      { key: "btech4th", label: "B.Tech 4th Year", papers: ["2025","2024","2023"] }
    ]
  },
  ece: {
    title: "Electronics & Communication Engineering",
    academicYears: [
      { key: "base1st", label: "Base 1st Year", papers: ["2025","2024","2023","2022"] },
      { key: "base2nd", label: "Base 2nd Year", papers: ["2025","2024","2023","2022"] },
      { key: "btech1st", label: "B.Tech 1st Year", papers: ["2025","2024","2023","2022"] },
      { key: "btech2nd", label: "B.Tech 2nd Year", papers: ["2025","2024","2023"] },
      { key: "btech3rd", label: "B.Tech 3rd Year", papers: ["2025","2024"] },
      { key: "btech4th", label: "B.Tech 4th Year", papers: ["2025","2024"] }
    ]
  },
  me: {
    title: "Mechanical Engineering",
    academicYears: [
      { key: "base1st", label: "Base 1st Year", papers: ["2025","2024"] },
      { key: "base2nd", label: "Base 2nd Year", papers: ["2025","2024"] },
      { key: "btech1st", label: "B.Tech 1st Year", papers: ["2025","2024"] },
      { key: "btech2nd", label: "B.Tech 2nd Year", papers: ["2025","2024"] },
      { key: "btech3rd", label: "B.Tech 3rd Year", papers: ["2025"] },
      { key: "btech4th", label: "B.Tech 4th Year", papers: ["2025"] }
    ]
  },
  ce: {
    title: "Civil Engineering",
    academicYears: [
      { key: "base1st", label: "Base 1st Year", papers: ["2025","2024"] },
      { key: "base2nd", label: "Base 2nd Year", papers: ["2025","2024"] },
      { key: "btech1st", label: "B.Tech 1st Year", papers: ["2025","2024"] },
      { key: "btech2nd", label: "B.Tech 2nd Year", papers: ["2025","2024"] },
      { key: "btech3rd", label: "B.Tech 3rd Year", papers: ["2025"] },
      { key: "btech4th", label: "B.Tech 4th Year", papers: ["2025"] }
    ]
  },
  ee: {
    title: "Electrical Engineering",
    academicYears: [
      { key: "base1st", label: "Base 1st Year", papers: ["2025","2024"] },
      { key: "base2nd", label: "Base 2nd Year", papers: ["2025","2024"] },
      { key: "btech1st", label: "B.Tech 1st Year", papers: ["2025","2024"] },
      { key: "btech2nd", label: "B.Tech 2nd Year", papers: ["2025","2024"] },
      { key: "btech3rd", label: "B.Tech 3rd Year", papers: ["2025"] },
      { key: "btech4th", label: "B.Tech 4th Year", papers: ["2025"] }
    ]
  },
  agri: {
    title: "Agriculture Engineering",
    academicYears: [
      { key: "base1st", label: "Base 1st Year", papers: ["2025","2024"] },
      { key: "base2nd", label: "Base 2nd Year", papers: ["2025","2024"] },
      { key: "btech1st", label: "B.Tech 1st Year", papers: ["2025","2024"] },
      { key: "btech2nd", label: "B.Tech 2nd Year", papers: ["2025"] },
      { key: "btech3rd", label: "B.Tech 3rd Year", papers: ["2025"] },
      { key: "btech4th", label: "B.Tech 4th Year", papers: ["2025"] }
    ]
  },
  forestry: {
    title: "Forestry Department",
    academicYears: [
      { key: "base1st", label: "Base 1st Year", papers: ["2025","2024"] },
      { key: "base2nd", label: "Base 2nd Year", papers: ["2025","2024"] },
      { key: "btech1st", label: "B.Tech 1st Year", papers: ["2025","2024"] },
      { key: "btech2nd", label: "B.Tech 2nd Year", papers: ["2025"] },
      { key: "btech3rd", label: "B.Tech 3rd Year", papers: ["2025"] },
      { key: "btech4th", label: "B.Tech 4th Year", papers: ["2025"] }
    ]
  }
};

// ------------------ DRIVE LINKS ------------------
// Replace IDs with your real Google Drive folder links
const driveLinks = {
  "cse-btech1st-2025-mid": "LINK_HERE",
  "cse-btech1st-2025-end": "LINK_HERE",
  // 👉 continue for all branches, all years, all exam types
};

// ------------------ SCRIPT LOGIC ------------------
document.addEventListener("DOMContentLoaded", () => {
  const dept = document.body.dataset.dept;
  if (!deptConfig[dept]) return;

  const section = document.getElementById("year-selection");
  renderAcademicYears(dept, section);
});

function renderAcademicYears(dept, section) {
  const config = deptConfig[dept];
  section.innerHTML = `
    <h1>${config.title}</h1>
    <p>Select your academic year:</p>
    <div class="row" id="year-grid"></div>
  `;
  const grid = section.querySelector("#year-grid");

  config.academicYears.forEach(y => {
    const div = document.createElement("div");
    div.className = "year-box";
    div.textContent = y.label;
    div.addEventListener("click", () => renderPaperYears(dept, y.key, y.papers, section));
    grid.appendChild(div);
  });
}

function renderPaperYears(dept, academicKey, paperYears, section) {
  section.innerHTML = `
    <h1>Select Paper Year</h1>
    <div class="row" id="paper-grid"></div>
    <button id="backBtn">⬅ Back</button>
  `;
  const grid = section.querySelector("#paper-grid");

  paperYears.forEach(yr => {
    const div = document.createElement("div");
    div.className = "year-box";
    div.textContent = yr;
    div.addEventListener("click", () => renderExamTypes(dept, academicKey, yr, section));
    grid.appendChild(div);
  });

  section.querySelector("#backBtn").addEventListener("click", () => {
    renderAcademicYears(dept, section);
  });
}

function renderExamTypes(dept, academicKey, paperYear, section) {
  section.innerHTML = `
    <h1>${paperYear} - Choose Exam Type</h1>
    <div class="row" id="exam-grid"></div>
    <button id="backBtn">⬅ Back</button>
  `;
  const grid = section.querySelector("#exam-grid");

  ["mid","end"].forEach(exam => {
    const div = document.createElement("div");
    div.className = "year-box";
    div.textContent = exam === "mid" ? "Mid Sem" : "End Sem";
    div.addEventListener("click", () => {
      const key = `${dept}-${academicKey}-${paperYear}-${exam}`;
      const link = driveLinks[key];
      if (link) {
        window.open(link, "_blank");
      } else {
        alert("Link not found for " + key);
      }
    });
    grid.appendChild(div);
  });

  section.querySelector("#backBtn").addEventListener("click", () => {
    const config = deptConfig[dept];
    const academic = config.academicYears.find(a => a.key === academicKey);
    renderPaperYears(dept, academicKey, academic.papers, section);
  });
}
