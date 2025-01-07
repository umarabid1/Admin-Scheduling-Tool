// Helper functions for LocalStorage
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key) || "[]");
}

// Initialize Forms and Tables
document.addEventListener("DOMContentLoaded", function () {
    const forms = [
        { formId: "facultyForm", tableId: "facultyTable", storageKey: "facultyData" },
        { formId: "courseForm", tableId: "courseTable", storageKey: "courseData" },
        { formId: "sectionForm", tableId: "sectionTable", storageKey: "sectionData" }
    ];

    forms.forEach(({ formId, tableId, storageKey }) => {
        const form = document.getElementById(formId);
        const table = document.getElementById(tableId);
        if (form && table) {
            setupForm(form, table, storageKey);
        }
    });

    // Timetable toggle logic
    const showTimetableButton = document.getElementById("showTimetableButton");
    const timetableContainer = document.getElementById("timetableContainer");

    if (showTimetableButton && timetableContainer) {
        showTimetableButton.addEventListener("click", () => {
            if (timetableContainer.classList.contains("hidden")) {
                timetableContainer.classList.remove("hidden");
                populateTimetable(); // Populate the timetable only when showing
                showTimetableButton.textContent = "Hide Timetable";
            } else {
                timetableContainer.classList.add("hidden");
                showTimetableButton.textContent = "Show Timetable";
            }
        });
    }
});
// Dynamically generate time options
function populateTimeDropdown(selectElement) {
    const times = [];
    const startHour = 6; // Start at 8:00 AM
    const endHour = 23; // End at 8:00 PM

    for (let hour = startHour; hour <= endHour; hour++) {
        const ampm = hour < 12 ? "AM" : "PM";
        const adjustedHour = hour % 12 || 12; // Convert 24-hour time to 12-hour time
        times.push(`${adjustedHour}:00 ${ampm}`);
        times.push(`${adjustedHour}:15 ${ampm}`);
        times.push(`${adjustedHour}:30 ${ampm}`);
        times.push(`${adjustedHour}:45 ${ampm}`);
    }

    times.forEach(time => {
        const option = document.createElement("option");
        option.value = time;
        option.textContent = time;
        selectElement.appendChild(option);
    });
}

// Call the function to populate the dropdowns on page load
document.addEventListener("DOMContentLoaded", function () {
    populateTimeDropdown(document.getElementById("startTime"));
    populateTimeDropdown(document.getElementById("endTime"));
});
// Function to Set Up a Form and Associated Table
function setupForm(form, table, storageKey) {
    const customFieldsContainer = form.querySelector("#customFieldsContainer");
    const addFieldButton = form.querySelector("#addFieldButton");
    let editingIndex = null;

    // Add Custom Field
    if (addFieldButton) {
        addFieldButton.addEventListener("click", function () {
            const fieldId = `customField_${Date.now()}`;
            const fieldDiv = document.createElement("div");
            fieldDiv.classList.add("custom-field");
            fieldDiv.innerHTML = `
                <input type="text" id="${fieldId}_name" placeholder="Field Name" required>
                <input type="text" id="${fieldId}_value" placeholder="Field Value" required>
                <button type="button" class="remove-field-button">Remove</button>
            `;
            customFieldsContainer.appendChild(fieldDiv);

            // Attach remove functionality
            const removeButton = fieldDiv.querySelector(".remove-field-button");
            removeButton.addEventListener("click", function () {
                fieldDiv.remove();
            });
        });
    }

    // Submit Form
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Collect Standard Fields
        const formData = {};
        Array.from(form.elements).forEach(input => {
            if (input.id && !input.classList.contains("custom-field")) {
                formData[input.id] = input.value;
            }
        });

        // Collect Custom Fields
        formData.customFields = [];
        const customFields = form.querySelectorAll(".custom-field");
        customFields.forEach(field => {
            const fieldName = field.querySelector("input:nth-child(1)").value;
            const fieldValue = field.querySelector("input:nth-child(2)").value;
            formData.customFields.push({ name: fieldName, value: fieldValue });
        });

        // Save Data
        let data = loadFromLocalStorage(storageKey);
        if (editingIndex !== null) {
            data[editingIndex] = formData; // Update existing entry
            editingIndex = null; // Reset editing index
        } else {
            data.push(formData); // Add new entry
        }
        saveToLocalStorage(storageKey, data);

        // Reload Table and Reset Form
        loadTable(table, data);
        form.reset();
        if (customFieldsContainer) customFieldsContainer.innerHTML = ""; // Clear custom fields
    });

    // Load Table Data
    const data = loadFromLocalStorage(storageKey);
    loadTable(table, data);

    // Edit and Delete Row Handlers
    table.addEventListener("click", function (event) {
        const target = event.target;
        const rowIndex = target.getAttribute("data-index");

        if (target.classList.contains("edit-button")) {
            // Edit Row
            editingIndex = parseInt(rowIndex, 10);
            const rowData = loadFromLocalStorage(storageKey)[editingIndex];
            populateForm(form, rowData, customFieldsContainer);
        } else if (target.classList.contains("delete-button")) {
            // Delete Row
            let data = loadFromLocalStorage(storageKey);
            data.splice(rowIndex, 1); // Remove the item at the specified index
            saveToLocalStorage(storageKey, data);
            loadTable(table, data);
        }
    });
}

// Populate Form with Existing Data for Editing
function populateForm(form, data, customFieldsContainer) {
    Object.entries(data).forEach(([key, value]) => {
        const input = form.querySelector(`#${key}`);
        if (input) {
            input.value = value;
        }
    });

    if (customFieldsContainer && data.customFields) {
        customFieldsContainer.innerHTML = data.customFields.map(field => `
            <div class="custom-field">
                <input type="text" value="${field.name}" placeholder="Field Name" required>
                <input type="text" value="${field.value}" placeholder="Field Value" required>
                <button type="button" class="remove-field-button">Remove</button>
            </div>
        `).join("");

        customFieldsContainer.querySelectorAll(".remove-field-button").forEach(button => {
            button.addEventListener("click", () => button.parentElement.remove());
        });
    }
}

// Load Data into the Table
function loadTable(table, data) {
    const tbody = table.querySelector("tbody");
    tbody.innerHTML = data.map((item, index) => `
        <tr>
            ${Object.entries(item).map(([key, value]) => {
                if (key === "customFields") {
                    return `<td>${value.map(field => `${field.name}: ${field.value}`).join("<br>")}</td>`;
                } else {
                    return `<td>${value}</td>`;
                }
            }).join("")}
            <td>
                <button class="edit-button" data-index="${index}">Edit</button>
                <button class="delete-button" data-index="${index}">Delete</button>
            </td>
        </tr>
    `).join("");
}

// Filter/Search Function for Tables
function filterTable(tableId, searchValue) {
    const input = searchValue.toLowerCase(); // Convert input to lowercase for case-insensitive search
    const table = document.getElementById(tableId);
    if (!table) return; // If table is not found, exit
    const rows = table.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName("td");
        let rowMatches = false;

        for (let j = 0; j < cells.length; j++) {
            const cellText = cells[j].textContent.toLowerCase();
            if (cellText.includes(input)) {
                rowMatches = true;
                break;
            }
        }

        rows[i].style.display = rowMatches ? "" : "none"; // Show or hide the row
    }
}

// Toggle the Hamburger Menu
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
}

// Populate Timetable with Section Data
function populateTimetable() {
    const timetableBody = document.querySelector(".timetable .body");
    const timeSlots = [
        "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
        "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
    ];

    timetableBody.innerHTML = ""; // Clear previous rows

    timeSlots.forEach((time) => {
        const row = document.createElement("div");
        row.classList.add("row");

        const timeCell = document.createElement("div");
        timeCell.classList.add("cell");
        timeCell.textContent = time;
        row.appendChild(timeCell);

        ["S", "M", "T", "W", "R", "F", "S"].forEach((day) => {
            const dayCell = document.createElement("div");
            dayCell.classList.add("cell");

            const sectionData = loadFromLocalStorage("sectionData").find(section => {
                return section.days.includes(day) && section.startTime === time;
            });

            if (sectionData) {
                dayCell.textContent = `${sectionData.courseName} (${sectionData.room})`;
                dayCell.classList.add("event");
            } else {
                dayCell.textContent = "-"; // Placeholder for empty slots
                dayCell.style.color = "#ccc"; // Lighten placeholder text
            }

            row.appendChild(dayCell);
        });

        timetableBody.appendChild(row);
    });
}

// Helper functions for LocalStorage
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key) || "[]");
}

// Add a course to the timetable
function addCourse() {
    const courseNumber = document.getElementById('courseInput').value.trim();
    const day = document.getElementById('daySelect').value;
    const startTime = document.getElementById('startTimeSelect').value;
    const endTime = document.getElementById('endTimeSelect').value;

    if (!courseNumber || !day || !startTime || !endTime) {
        alert('Please fill in all fields.');
        return;
    }

    const startIndex = timeToIndex(startTime);
    const endIndex = timeToIndex(endTime);

    if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
        alert('Invalid time selection.');
        return;
    }

    // Allow adding multiple courses to the same slot
    for (let i = startIndex; i < endIndex; i++) {
        const cellId = `${day}-${["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm"][i]}`;
        const cell = document.getElementById(cellId);

        if (cell) {
            // Add the new course to the cell content
            const courseDiv = document.createElement('div');
            courseDiv.classList.add('event');
            courseDiv.textContent = courseNumber;

            // Optional: Add a delete button for each event
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.style.marginLeft = '10px';
            deleteButton.onclick = () => {
                courseDiv.remove(); // Remove the specific course
            };

            courseDiv.appendChild(deleteButton);
            cell.appendChild(courseDiv);
        }
    }

    // Optionally, save the updated schedule to local storage
    const courses = loadFromLocalStorage('timetableCourses');
    courses.push({ courseNumber, day, startTime, endTime });
    saveToLocalStorage('timetableCourses', courses);

    // Clear input fields
    document.getElementById('courseInput').value = '';
    document.getElementById('daySelect').value = '';
    document.getElementById('startTimeSelect').value = '';
    document.getElementById('endTimeSelect').value = '';
}

// Populate timetable on load
function populateTimetable() {
    const courses = loadFromLocalStorage('timetableCourses');
    courses.forEach(course => {
        const { courseNumber, day, startTime, endTime } = course;
        const startIndex = timeToIndex(startTime);
        const endIndex = timeToIndex(endTime);

        for (let i = startIndex; i < endIndex; i++) {
            const cellId = `${day}-${["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm"][i]}`;
            const cell = document.getElementById(cellId);
            if (cell) {
                cell.innerHTML = `
                    <div class="event">
                        ${courseNumber}
                        <button onclick="deleteCourse('${day}', '${startTime}', '${endTime}', '${courseNumber}')">Delete</button>
                    </div>
                `;
            }
        }
    });
}

// Delete a single course
function deleteCourse(day, startTime, endTime, courseNumber) {
    if (confirm(`Are you sure you want to delete the course "${courseNumber}"?`)) {
        // Load current courses from localStorage
        let courses = loadFromLocalStorage('timetableCourses');

        // Filter out the course to delete
        courses = courses.filter(course => 
            !(course.day === day && course.startTime === startTime && course.endTime === endTime && course.courseNumber === courseNumber)
        );

        // Save updated courses to localStorage
        saveToLocalStorage('timetableCourses', courses);

        // Clear the course from the timetable
        const startIndex = timeToIndex(startTime);
        const endIndex = timeToIndex(endTime);

        for (let i = startIndex; i < endIndex; i++) {
            const cellId = `${day}-${["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm"][i]}`;
            const cell = document.getElementById(cellId);
            if (cell && cell.innerHTML.includes(courseNumber)) {
                cell.innerHTML = ''; // Clear the cell content
            }
        }

        alert(`Course "${courseNumber}" has been deleted.`);
    }
}

// Helper to convert time to index
function timeToIndex(time) {
    const times = ["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm"];
    return times.indexOf(time);
}

// Initialize timetable on page load
document.addEventListener('DOMContentLoaded', populateTimetable);
// Delete all courses
function deleteAllCourses() {
    if (confirm('Are you sure you want to delete all courses?')) {
        localStorage.removeItem('timetableCourses');
        document.querySelectorAll('.event').forEach(event => event.parentElement.innerHTML = '');
        alert('All courses have been deleted.');
    }
}

