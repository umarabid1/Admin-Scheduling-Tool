# Cyber-Zamurai

## Project Overview
Cyber-Zamurai is a system designed to simplify academic scheduling by automating the allocation of teaching resources and centralizing course-related data. It enables administrators to manage a comprehensive database of faculty members and course offerings. The system streamlines the creation and modification of course sections, assigning qualified faculty based on their availability and expertise.

---

## Features
- **Faculty Management**: Add and list faculty members.
- **Course Management**: Add and list available courses.
- **Scheduling Automation**: Assign courses to faculty members based on availability and expertise.
- **Validation and Error Handling**: Ensure accurate data entry and dynamic updates.
- **Centralized Management**: View and manage faculty, courses, and schedules from a single interface.

---

## User Stories

### Faculty Management
**As an administrator,** I want to add faculty members to manage course assignments.
- **Acceptance Criteria**:
  - The system allows input of faculty names.
  - Faculty names are displayed in a list.

### Course Management
**As an administrator,** I want to add course offerings to manage what is available for scheduling.
- **Acceptance Criteria**:
  - The system allows input of course names.
  - Course names are displayed in a list.

### Scheduling Automation
**As an administrator,** I want to assign courses to faculty members to automate scheduling.
- **Acceptance Criteria**:
  - The system allows selection of faculty and courses.
  - Assigned courses are displayed in a schedule list.

---

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

---

## Bugs
- **Input Validation Issues**: Ensure that empty faculty or course names cannot be submitted.
- **Dropdown Functionality**: Ensure that new entries appear dynamically in the dropdown menus.

---

## Technical Debt
- **Refactor UI Code**: Improve code organization by separating logic into different classes or modules.
- **Add Unit Tests**: Create tests for core functionalities to ensure reliability during future changes.



