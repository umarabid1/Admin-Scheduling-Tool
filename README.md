# Admin Scheduling Tool


## Project Overview
Cyber-Zamurai is a system designed to simplify academic scheduling by automating the allocation of teaching resources and centralizing course-related data. It enables administrators to manage a comprehensive database of faculty members and course offerings. The system streamlines the creation and modification of course sections, assigning qualified faculty based on their availability and expertise.

---

## Features
- **Faculty Management**: Add and list faculty members.
- **Course Management**: Add and list available courses.
- **Scheduling Automation**: Assign courses to faculty members based on availability and expertise.
- **Validation and Error Handling**: Ensure accurate data entry and dynamic updates.
- **Centralized Management**: View and manage faculty, courses, and schedules from a single interface.

## Tech Stack
- **Frontend:** React.js, HTML, CSS
- **Backend:** Node.js (Express.js)
- **Data Persistence:** LocalStorage (real-time database to be added later)

## Tasks

### Faculty Management
- Create a UI for adding and listing faculty members.
- Add data validation for faculty names.

### Course Management
- Create a UI for adding and listing courses.
- Add data validation for course names.

### Scheduling Functionality
- Allow assignment of courses to selected faculty.
- Store and display assigned courses in a schedule list.


## How to Run the Project

### **1. Clone the Repository**
```bash
git clone https://github.com/umarabid1/Admin-Scheduling-Tool.git
cd Admin-Scheduling-Tool
```

### **2. Install Dependencies**
Navigate to the backend folder and install required dependencies:
```bash
cd backend
npm install
```

### **3. Start the Backend Server**
```bash
npm start
```
The backend should now be running at `http://localhost:5000`.

### **4. Run the Frontend**
Open the **index.html** file in a browser or use **Live Server** in VS Code to serve the frontend.

---

## How the System Works

### **Faculty Management**
- Administrators can add faculty members with **name, department, and availability**.
- Data is stored locally in **LocalStorage**, ensuring it persists between sessions.

### **Course Management**
- Courses can be added with **course code, title, and credit hours**.
- Course assignments update in real-time without the need for a backend database.

### **Scheduling Automation**
- Faculty members are dynamically assigned to courses based on availability.
- The system ensures **conflict-free scheduling**, preventing faculty from being assigned to overlapping shifts.

---
## Future Improvements
- **Integration with a Database:** Shift from LocalStorage to a real-time database (e.g., Firebase or MongoDB).
- **Authentication System:** Implement user login functionality for restricted access.
- **Export & Import Data:** Allow users to save and load schedules for backup purposes.
- **Advanced Filtering:** Add filtering based on faculty availability, department, and workload.
