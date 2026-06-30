# 📋 Task Manager (Angular Signals)

> This project is part of the **Angular Projects** collection.

## About

This project is the **Signals-based evolution** of the original Task Manager application.

Its primary purpose is to explore Angular's new reactive programming model introduced with **Signals**, while maintaining the same application features and architecture of the classic version.

Instead of relying on the traditional RxJS-based state management approach, this version uses Angular Signals to provide a simpler, more declarative and more predictable way to manage application state.

---

## Features

- ✅ Create new tasks
- ✏️ Edit existing tasks
- 🗑️ Delete tasks
- ✔️ Mark tasks as completed or pending
- 🔍 Search tasks
- 🎯 Filter tasks (All / Completed / Pending)
- 📊 Display task statistics
- 💾 Persistent storage using Local Storage
- ⚡ State management powered by Angular Signals

---

## Technologies

- Angular 19
- TypeScript
- Angular Signals
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
├── services
│   └── task-signal.service.ts
│
└── pages
```

---

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Go to the project folder

```bash
cd TaskManagerSignal
```

Install dependencies

```bash
npm install
```

Run the application

```bash
ng serve
```

Open your browser at

```
http://localhost:4200
```

---

## What I Learned

This project allowed me to deepen my understanding of Angular's modern reactive features, including:

- Angular Signals
- Signal-based state management
- Component communication
- Standalone Components
- Local Storage persistence
- Component-based architecture
- Migration from a traditional RxJS approach to Signals

---

## Differences from the Classic Version

Compared to the original Task Manager, this version:

- uses Angular Signals for state management;
- reduces the need for Observable-based data flows;
- simplifies component reactivity;
- follows Angular's latest recommended development approach.

---

## Future Improvements

Possible future enhancements include:

- Backend integration with REST APIs
- Authentication
- Task priorities
- Categories
- Due dates
- Drag & Drop support
- Responsive UI improvements

---
## Repository Collection

This project belongs to the **Angular Projects** repository, a collection of applications developed to explore Angular concepts, compare different architectural approaches and continuously improve my frontend development skills.
---
## Author

**Giuseppe Giordano**

Full Stack Developer (Java • Spring Boot • Angular • React)
