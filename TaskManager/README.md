# 📋 Task Manager

## About

Task Manager is a single-page application developed with **Angular 19** to manage daily tasks through a simple and intuitive interface.

The project was created to strengthen my understanding of Angular fundamentals by building a real application following a component-based architecture and using Angular best practices.

Tasks are stored locally using the browser's **Local Storage**, allowing data to persist between sessions without requiring a backend.

---

## Features

- ✅ Create new tasks
- ✏️ Update existing tasks
- 🗑️ Delete tasks
- ✔️ Mark tasks as completed or pending
- 🔍 Search tasks by title
- 🎯 Filter tasks (All / Completed / Pending)
- 📊 Display task statistics
- 💾 Persistent storage using Local Storage

---

## Technologies

- Angular 19
- TypeScript
- HTML5
- CSS3
- Standalone Components
- Angular Router
- FormsModule
- Local Storage

---

## Project Structure

```
src/app
│
├── components
│   ├── task-form
│   ├── task-item
│   ├── task-list
│   ├── task-filter
│   └── task-stats
│
├── models
│
├── pages
│
└── services
```

---

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Go to the project folder

```bash
cd TaskManager
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
ng serve
```

Navigate to

```
http://localhost:4200
```

---

## What I Learned

Through this project I practiced several core Angular concepts, including:

- Component-based architecture
- Standalone Components
- Component communication using `@Input()` and `@Output()`
- Angular Services
- Forms handling with FormsModule
- State management through services
- Data persistence with Local Storage
- Application organization following Angular best practices

---

## Future Improvements

Possible future enhancements include:

- Authentication and user accounts
- Backend integration with REST APIs
- Database persistence
- Task priorities
- Due dates
- Categories and tags
- Drag & Drop task ordering
- Responsive UI improvements

---

## Author

**Giuseppe Giordano**

Full Stack Developer (Java • Spring Boot • Angular • React)
