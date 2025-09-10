// ----------------------
// Dynamic Department → Year → Drive Links
// ----------------------

// Department → Years mapping
const deptYears = {
  "Agriculture": ["1st Year", "2nd Year", "3rd Year"],
  "Computer Science": ["1st Year", "2nd Year", "3rd Year", "4th Year"],
  "Civil": ["1st Year", "2nd Year", "3rd Year", "4th Year"],
  "Electrical": ["1st Year", "2nd Year", "3rd Year", "4th Year"],
  "Electronics": ["1st Year", "2nd Year", "3rd Year", "4th Year"],
  "Mechanical": ["1st Year", "2nd Year", "3rd Year", "4th Year"],
  "Forestry": ["1st Year", "2nd Year", "3rd Year"]
};

// Manually set your Google Drive links
const driveLinks = {
  "Computer Science-1st Year": "https://drive.google.com/drive/folder/ID1",
  "Computer Science-2nd Year": "https://drive.google.com/drive/folder/ID2",
  "Mechanical-1st Year": "https://drive.google.com/drive/folder/ID3",
  "Electrical-1st Year": "https://drive.google.com/drive/folder/ID4",
  // Add all other links here following "Department-Year": "DriveURL"
};

// Open department → show year boxes
function openDept(deptName) {
  const yearGrid = document.getElementById("year-grid");
  yearGrid.innerHTML = ""; // Clear previous content

  // Create Back button
  const backBtn = document.createElement("div");
  backBtn.className = "dept-col layer back-btn";
  backBtn.innerHTML = "<h3>← Back</h3>";
  backBtn.onclick = () => {
    yearGrid.innerHTML = "";
    document.querySelector("#Search .row").style.display = "flex";
  };
  yearGrid.appendChild(backBtn);

  // Create year boxes
  deptYears[deptName].forEach((year) => {
    const box = document.createElement("div");
    box.className = "dept-col layer";
    box.innerHTML = `<h3>${year}</h3>`;
    box.onclick = () => {
      const key = `${deptName}-${year}`;
      if (driveLinks[key]) window.open(driveLinks[key], "_blank");
      else alert("Drive link not found");
    };
    yearGrid.appendChild(box);
  });

  // Hide original department row
  document.querySelector("#Search .row").style.display = "none";
}

// Assign click events to existing department boxes
document.querySelectorAll("#Search .dept-col").forEach((col) => {
  const deptName = col.querySelector("h3").innerText.split("\n")[0]; // Extract department name
  col.onclick = () => openDept(deptName);

  // Remove existing <a> if present
  const aTag = col.querySelector("a");
  if (aTag) aTag.remove();
});


// ----------------------
// Existing Question Paper Search Functionality
// ----------------------

// Sample question paper data with Google Drive links
const questions = [
  {
    year: "Base 1st Year",
    department: "Mechanical Eng.",
    driveLink: "https://drive.google.com/drive/folders/DRIVE_FOLDER_ID_1",
  },
  {
    year: "Btech 2nd Year",
    department: "Computer Science Eng.",
    driveLink: "https://drive.google.com/drive/folders/DRIVE_FOLDER_ID_2",
  },
  {
    year: "Btech 4th Year",
    department: "Electrical Eng.",
    driveLink: "https://drive.google.com/drive/folders/DRIVE_FOLDER_ID_3",
  },
];

// Render the list of question papers
function renderQuestions(list) {
  const container = document.getElementById("questions-section");
  if (!container) return; // If container doesn't exist, skip
  container.innerHTML = "";
  if (list.length === 0) {
    container.innerHTML =
      "<p>No questions found for the selected criteria.</p>";
    return;
  }
  list.forEach((q) => {
    const card = document.createElement("div");
    card.classList.add("question-card");
    card.innerHTML = `
      <h3>${q.year} - ${q.department}</h3>
      <a href="${q.driveLink}" target="_blank" rel="noopener noreferrer">Open in Google Drive</a>
    `;
    container.appendChild(card);
  });
}

// Handle Search button click to filter results
const searchBtn = document.getElementById("searchBtn");
if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    const yearSelect = document.getElementById("yearSelect");
    const deptSelect = document.getElementById("deptSelect");

    const selectedYear = yearSelect?.value || "";
    const selectedDept = deptSelect?.value || "";

    const filtered = questions.filter((q) => {
      const yearMatch = !selectedYear || q.year === selectedYear;
      const deptMatch = !selectedDept || q.department === selectedDept;
      return yearMatch && deptMatch;
    });

    renderQuestions(filtered);
  });
}

// On page load, render all questions initially
renderQuestions(questions);
