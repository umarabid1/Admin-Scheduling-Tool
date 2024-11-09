// Helper function to save data to Local Storage
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Helper function to load data from Local Storage
function loadFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

// Faculty Management
let editingFacultyIndex = null;

document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("facultyTable")) {
        loadFacultyTable(); // Load faculty data on page load
    }
});

document.getElementById("facultyForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const type = document.getElementById("type").value; // Now accepts free-text input
    const email = document.getElementById("email").value;
    const notes = document.getElementById("notes").value;

    let facultyData = loadFromLocalStorage("facultyData");

    if (editingFacultyIndex !== null) {
        // Update existing entry
        facultyData[editingFacultyIndex] = { name, type, email, notes };
        editingFacultyIndex = null; // Reset editing mode
    } else {
        // Add new entry
        const newFaculty = { name, type, email, notes };
        facultyData.push(newFaculty);
    }

    saveToLocalStorage("facultyData", facultyData);
    loadFacultyTable(); // Reload the table to reflect changes
    document.getElementById("facultyForm").reset();
});

function loadFacultyTable() {
    const tableBody = document.getElementById("facultyTable").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = ""; // Clear existing rows
    const facultyData = loadFromLocalStorage("facultyData");
    facultyData.forEach((faculty, index) => addFacultyToTable(faculty, index));
}

function addFacultyToTable(faculty, index) {
    const table = document.getElementById("facultyTable").getElementsByTagName("tbody")[0];
    const newRow = table.insertRow();

    newRow.innerHTML = `
        <td>${faculty.name}</td>
        <td>${faculty.type}</td>
        <td>${faculty.email}</td>
        <td>${faculty.notes}</td>
        <td>
            <button onclick="editFaculty(${index})">Edit</button>
            <button onclick="deleteFacultyRow(${index})">Delete</button>
        </td>
    `;
}

function editFaculty(index) {
    const facultyData = loadFromLocalStorage("facultyData");
    const faculty = facultyData[index];

    document.getElementById("name").value = faculty.name;
    document.getElementById("type").value = faculty.type;
    document.getElementById("email").value = faculty.email;
    document.getElementById("notes").value = faculty.notes;

    editingFacultyIndex = index; // Set editing mode with index
}

function deleteFacultyRow(index) {
    let facultyData = loadFromLocalStorage("facultyData");
    facultyData.splice(index, 1); // Remove entry at index
    saveToLocalStorage("facultyData", facultyData);
    loadFacultyTable(); // Reload the table to reflect deletion
}


// Course Management
let editingCourseIndex = null;

document.getElementById("courseForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const courseCode = document.getElementById("courseCode").value;
    const courseNumber = document.getElementById("courseNumber").value;
    const courseName = document.getElementById("courseName").value;
    const discipline = document.getElementById("discipline").value;
    const year = document.getElementById("year").value;
    const anticipatedEnrollment = document.getElementById("anticipatedEnrollment").value;

    let courseData = loadFromLocalStorage("courseData");

    if (editingCourseIndex !== null) {
        courseData[editingCourseIndex] = { courseCode, courseNumber, courseName, discipline, year, anticipatedEnrollment };
        editingCourseIndex = null;
    } else {
        const newCourse = { courseCode, courseNumber, courseName, discipline, year, anticipatedEnrollment };
        courseData.push(newCourse);
    }

    saveToLocalStorage("courseData", courseData);
    loadCourseTable();
    document.getElementById("courseForm").reset();
});

function loadCourseTable() {
    const tableBody = document.getElementById("courseTable").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = ""; // Clear existing rows
    const courseData = loadFromLocalStorage("courseData");
    courseData.forEach((course, index) => addCourseToTable(course, index));
}

function addCourseToTable(course, index) {
    const table = document.getElementById("courseTable").getElementsByTagName("tbody")[0];
    const newRow = table.insertRow();

    newRow.innerHTML = `
        <td>${course.courseCode}</td>
        <td>${course.courseNumber}</td>
        <td>${course.courseName}</td>
        <td>${course.discipline}</td>
        <td>${course.year}</td>
        <td>${course.anticipatedEnrollment}</td>
        <td>
            <button onclick="editCourse(${index})">Edit</button>
            <button onclick="deleteCourseRow(${index})">Delete</button>
        </td>
    `;
}

function editCourse(index) {
    const courseData = loadFromLocalStorage("courseData");
    const course = courseData[index];

    document.getElementById("courseCode").value = course.courseCode;
    document.getElementById("courseNumber").value = course.courseNumber;
    document.getElementById("courseName").value = course.courseName;
    document.getElementById("discipline").value = course.discipline;
    document.getElementById("year").value = course.year;
    document.getElementById("anticipatedEnrollment").value = course.anticipatedEnrollment;

    editingCourseIndex = index;
}

function deleteCourseRow(index) {
    let courseData = loadFromLocalStorage("courseData");
    courseData.splice(index, 1);
    saveToLocalStorage("courseData", courseData);
    loadCourseTable();
}

// Section Scheduling
let editingSectionIndex = null;

document.getElementById("sectionForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const courseName = document.getElementById("courseName").value;
    const courseCode = document.getElementById("courseCode").value;
    const sectionNumber = document.getElementById("sectionNumber").value;
    const facultyName = document.getElementById("facultyName").value;
    const room = document.getElementById("room").value;
    const days = document.getElementById("days").value;
    const type = document.getElementById("type").value;
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;
    const anticipatedEnrollment = document.getElementById("anticipatedEnrollment").value;

    let sectionData = loadFromLocalStorage("sectionData");

    if (editingSectionIndex !== null) {
        sectionData[editingSectionIndex] = { courseName, courseCode, sectionNumber, facultyName, room, days, type, startTime, endTime, anticipatedEnrollment };
        editingSectionIndex = null;
    } else {
        const newSection = { courseName, courseCode, sectionNumber, facultyName, room, days, type, startTime, endTime, anticipatedEnrollment };
        sectionData.push(newSection);
    }

    saveToLocalStorage("sectionData", sectionData);
    loadSectionTable();
    document.getElementById("sectionForm").reset();
});

function loadSectionTable() {
    const tableBody = document.getElementById("sectionTable").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = ""; // Clear existing rows
    const sectionData = loadFromLocalStorage("sectionData");
    sectionData.forEach((section, index) => addSectionToTable(section, index));
}

function addSectionToTable(section, index) {
    const table = document.getElementById("sectionTable").getElementsByTagName("tbody")[0];
    const newRow = table.insertRow();

    newRow.innerHTML = `
        <td>${section.courseName}</td>
        <td>${section.courseCode}</td>
        <td>${section.sectionNumber}</td>
        <td>${section.facultyName}</td>
        <td>${section.room}</td>
        <td>${section.days}</td>
        <td>${section.type}</td>
        <td>${section.startTime}</td>
        <td>${section.endTime}</td>
        <td>${section.anticipatedEnrollment}</td>
        <td>
            <button onclick="editSection(${index})">Edit</button>
            <button onclick="deleteSectionRow(${index})">Delete</button>
        </td>
    `;
}

function editSection(index) {
    const sectionData = loadFromLocalStorage("sectionData");
    const section = sectionData[index];

    document.getElementById("courseName").value = section.courseName;
    document.getElementById("courseCode").value = section.courseCode;
    document.getElementById("sectionNumber").value = section.sectionNumber;
    document.getElementById("facultyName").value = section.facultyName;
    document.getElementById("room").value = section.room;
    document.getElementById("days").value = section.days;
    document.getElementById("type").value = section.type;
    document.getElementById("startTime").value = section.startTime;
    document.getElementById("endTime").value = section.endTime;
    document.getElementById("anticipatedEnrollment").value = section.anticipatedEnrollment;

    editingSectionIndex = index; // Set editing mode with index
}

function deleteSectionRow(index) {
    let sectionData = loadFromLocalStorage("sectionData");
    sectionData.splice(index, 1); // Remove entry at index
    saveToLocalStorage("sectionData", sectionData);
    loadSectionTable(); // Reload the table to reflect deletion
}

// Timetable Visualization
const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("facultyTable")) {
        loadFacultyTable();
    }
    if (document.getElementById("courseTable")) {
        loadCourseTable();
    }
    if (document.getElementById("sectionTable")) {
        loadSectionTable();
    }
    if (document.querySelector("#timetable")) {
        generateTimetable();
    }
});

function generateTimetable() {
    const timetableBody = document.querySelector("#timetable tbody");
    const sectionData = loadFromLocalStorage("sectionData");

    // Create rows for each time slot
    timeSlots.forEach((time) => {
        const row = document.createElement("tr");
        const timeCell = document.createElement("td");
        timeCell.textContent = time;
        row.appendChild(timeCell);

        // Add empty cells for each day of the week
        ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].forEach((day) => {
            const cell = document.createElement("td");
            cell.setAttribute("data-time", time);
            cell.setAttribute("data-day", day);
            row.appendChild(cell);
        });

        timetableBody.appendChild(row);
    });

    // Populate the timetable with section data
    sectionData.forEach((section) => {
        const { courseName, days, startTime, endTime, room } = section;
        const startRow = timeSlots.indexOf(startTime);
        const endRow = timeSlots.indexOf(endTime);

        days.split(",").forEach(day => {
            if (startRow !== -1 && endRow !== -1) {
                const row = timetableBody.children[startRow];
                const cell = row.querySelector(`[data-day="${day.trim()}"]`);
                if (cell) {
                    cell.textContent = `${courseName}\n${room}`;
                    cell.setAttribute("rowspan", endRow - startRow + 1);
                    cell.style.backgroundColor = "#18BC9C";
                    cell.style.color = "white";
                    cell.style.fontWeight = "bold";

                    // Remove overlapping cells to create a merged cell effect
                    for (let i = startRow + 1; i <= endRow; i++) {
                        const overlappingCell = timetableBody.children[i].querySelector(`[data-day="${day.trim()}"]`);
                        if (overlappingCell) overlappingCell.remove();
                    }
                }
            }
        });
    });
}

