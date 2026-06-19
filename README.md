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

## Live Demo Link

https://youtu.be/etlwClKS1us

## Screenshots

### Desktop View

![Desktop Screenshot](./public/screenshots/Screenshot%202026-06-17%20at%2012.52.02 AM.png)

### Mobile View

![Mobile Screenshot](<./public/screenshots/localhost_3001_todos(iPhone%2014%20Pro%20Max).png>)

## Design Decisions

I chose a custom CSS approach to create a retro-inspired user interface that gives the app a unique visual identity, instead of a generic look. The goal was to transform the default Todo application into something that felt more portfolio-ready while maintaining readability and accessibility.

Key design decisions included:

- Using a bold display font for strong visual hierarchy
- Creating a retro color palette with high contrast
- Organizing content into clearly defined sections
- Adding visual feedback for user interactions and completed tasks
- Maintaining responsive layouts for different screen sizes

## License

This project is licensed under the MIT License.

## Contact Information

GitHub: https://github.com/liyah2

Portfolio: https://github.com/liyah2
