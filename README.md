# Todo List

A Todo List React app built with Vite that allows the user to create, manage, filter, sort, and complete tasks. The application includes things like authentication, protected routes, optimistic UI updates, and input sanitization for improved security.

## Features

- Create new todos
- Edit existing todos
- Mark todos as completed
- Filter todos by status (All, Active, Completed)
- Search todos by title
- Sort todos by creation date or title
- User authentication and protected routes
- Optimistic UI updates
- Input validation and sanitization using DOMPurify
- Responsive retro-inspired user interface

## Technologies Used

- React
- Vite
- React Router
- useReducer
- Context API
- DOMPurify
- CSS

## Installation

1. Clone the repository

```bash
git clone <repository-url>
```

2. Navigate to the project directory

```bash
cd todo-list
```

3. Install dependencies

```bash
npm install
```

## Running the Application

Start the development server:

```bash
npm run dev
```

Then open the local URL displayed in the terminal.

## Building for Production

Create a production build:

```bash
npm run build
```

## Security

This application includes:

- Input validation for todo titles
- Maximum todo title length validation
- Input sanitization using DOMPurify to help prevent malicious script injection

## Future Improvements

- Task categories
- Due dates
- Dark mode
- Drag-and-drop task organization
- Timer for timed tasks
