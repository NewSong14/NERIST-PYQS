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




// On page load, render all questions initially
renderQuestions(questions);

