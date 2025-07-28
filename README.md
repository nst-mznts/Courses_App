# 🎓 Courses App

## Description

This is a React application for selecting training courses. It features user authentication, role-based access (admin and regular users), and search functionality. Admins can manage courses, while regular users can view course details. All data is fetched from the backend and managed with Redux.

## Screenshots

![project image large screen](https://github.com/nst-mznts/Courses_App/blob/public/Courses_App.png)

![project image medium screen](https://github.com/nst-mznts/Courses_App/blob/public/Courses_App_medium.png)

![project image small screen](https://github.com/nst-mznts/Courses_App/blob/public/Courses_App_small.png)

## Tech Stack
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![SASS](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

## Features

- **User Authentication:** Users can register a new profile or log in with an existing one.
- **Role-Based Access:** Regular users can view detailed information about courses. Admins can create, edit, and delete courses.
- **Routing:** The app uses routing to navigate between pages.
- **Search Functionality:** Users can filter courses by keywords in the course title or description.
- **State Management with Redux:** Information about users, courses, and authors is stored and managed in the Redux store.
- **Backend Integration:** All data about courses and authors is fetched from the backend.
- **Responsive Design:** The app works well and looks good on different screen sizes.

## Requirements

Before you can run the project, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (Recommended version: v14 or higher)
- [npm](https://www.npmjs.com/) (Comes with Node.js)

## Installation

To set up and run the project, follow these steps:

**1. Clone the Backend Repository**

Clone the backend code and install its dependencies:

   ```bash
   git clone https://github.com/nst-mznts/Project-Management-App.git -b backend
   npm install
   ```

**2. Clone the Frontend Repository**

Clone the frontend code and install its dependencies:
   
   ```bash
   git clone https://github.com/nst-mznts/Courses_App.git
   npm install
   ```

**3. Run the Backend**

Start the backend:

   ```bash
   npm run start
   ```

**4. Run the Frontend**

Start the frontend:
   
   ```bash
   npm run start
   ```

A link will appear in the console: `http://localhost:5173/`. Open it in your browser to use the app.
