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


### Steps to Run
1. **Clone the Repository**
   ```bash
   git clone https://github.com/umarabid1/Admin-Scheduling-Tool.git
   cd Admin-Scheduling-Tool
   ```

2. **Install Dependencies**
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install required dependencies:
     ```bash
     npm install
     ```

3. **Start the Backend Server**
   ```bash
   npm start
   ```
   The backend should now be running at `http://localhost:5000`.

4. **Run the Frontend**
   - Open `index.html` in a browser or use **Live Server** in VS Code.

---

## Testing API Endpoints
Once the backend is running, use **Postman** or **cURL** to test the API.

### **Faculty API**
- **Get all faculty members**
  ```http
  GET http://localhost:5000/api/faculty
  ```
- **Add a new faculty member**
  ```http
  POST http://localhost:5000/api/faculty
  Content-Type: application/json

  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "department": "Computer Science"
  }
  ```
- **Update a faculty member**
  ```http
  PUT http://localhost:5000/api/faculty/{faculty_id}
  ```
- **Delete a faculty member**
  ```http
  DELETE http://localhost:5000/api/faculty/{faculty_id}
  ```

### **Course API**
- **Get all courses**
  ```http
  GET http://localhost:5000/api/courses
  ```
- **Add a new course**
  ```http
  POST http://localhost:5000/api/courses
  Content-Type: application/json

  {
    "code": "CS101",
    "name": "Introduction to Programming",
    "credits": 3
  }
  ```
- **Update a course**
  ```http
  PUT http://localhost:5000/api/courses/{course_id}
  ```
- **Delete a course**
  ```http
  DELETE http://localhost:5000/api/courses/{course_id}
  ```

---


