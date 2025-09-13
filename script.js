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

// ----------------------
// Make all department boxes clickable to open their own page
// ----------------------
document.querySelectorAll(".dept-col[data-dept]").forEach(box => {
  const dept = box.getAttribute("data-dept");
  box.addEventListener("click", () => {
    window.location.href = `branches/${dept}.html`;
  });
});
