# Project Handover Document: FaceRead

## 1. Project Overview

This project, "FaceRead," is a web application built with React and TypeScript, designed to provide an interactive quiz experience. It leverages modern web technologies to deliver a responsive and engaging user interface. The application supports internationalization, allowing for content in multiple languages.

## 2. Technology Stack

*   **Frontend Framework**: React (with TypeScript)
*   **Build Tool**: Vite
*   **Styling**: Tailwind CSS, shadcn/ui
*   **State Management**: React Context API
*   **Routing**: React Router DOM
*   **Animation**: Framer Motion
*   **Internationalization**: i18next
*   **Testing**: Vitest, React Testing Library
*   **Code Quality**: ESLint, Prettier

## 3. Development Environment Setup

To set up the development environment, follow these steps:

1.  **Node.js and npm/Yarn Installation**: Ensure you have Node.js (LTS version recommended) and npm (or Yarn) installed on your system.
    *   [Node.js Download](https://nodejs.org/en/download/)
2.  **Clone the Repository**:
    ```bash
    git clone <repository-url>
    cd FaceRead
    ```
3.  **Install Dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

## 4. Available Scripts

The following scripts are defined in `package.json` and can be run using `npm run <script-name>`:

*   `dev`: Starts the development server with hot-module reloading.
    ```bash
    npm run dev
    ```
*   `build`: Compiles the project for production. This generates optimized static assets in the `dist` directory.
    ```bash
    npm run build
    ```
*   `lint`: Runs ESLint to check for code quality issues and enforce coding standards.
    ```bash
    npm run lint
    ```
*   `preview`: Serves the production build locally for testing.
    ```bash
    npm run preview
    ```
*   `test`: Runs all unit tests using Vitest.
    ```bash
    npm run test
    ```
*   `test:ui`: Runs tests with the Vitest UI for interactive debugging.
    ```bash
    npm run test:ui
    ```
*   `test:run`: Runs all tests once and exits.
    ```bash
    npm run test:run
    ```
*   `test:coverage`: Runs tests and generates a code coverage report.
    ```bash
    npm run test:coverage
    ```
*   `test:watch`: Runs tests in watch mode, re-running on file changes.
    ```bash
    npm run test:watch
    ```
*   `test:step3`: Runs a specific test file (`src/lib/question-loader.test.ts`).
    ```bash
    npm run test:step3
    ```
*   `build:analyze`: Builds the project and then opens a bundle analysis report in your browser.
    ```bash
    npm run build:analyze
    ```

## 5. Project Structure

The core application logic resides in the `src` directory, organized as follows:

```
src/
├── App.css             # Global CSS for the application
├── App.tsx             # Main application component
├── index.css           # Entry point for global styles (Tailwind CSS)
├── main.tsx            # Application entry point (React DOM rendering)
├── components/         # Reusable UI components
│   ├── AdBanner.tsx
│   ├── QuestionCard.tsx
│   ├── RewardScreen.tsx
│   └── ui/             # shadcn/ui components
│       ├── accordion.tsx
│       └── button.tsx
├── contexts/           # React Context API providers
│   └── QuizContext.tsx # Manages quiz state globally
├── data/               # Static data files (e.g., quiz questions)
│   ├── questions.en.json
│   └── questions.ko.json
├── hooks/              # Custom React hooks for reusable logic
│   ├── useQuiz.test.ts
│   ├── useQuiz.ts      # Core quiz logic hook
│   └── useShare.ts
├── lib/                # Utility functions and helper modules
│   ├── analytics.ts
│   ├── question-loader.test.ts
│   ├── question-loader.ts # Logic for loading quiz questions
│   └── utils.ts
├── pages/              # Top-level page components
│   ├── HomePage.tsx
│   ├── QuizPage.tsx
│   └── ResultPage.tsx
├── test/               # Test setup files
│   └── setup.ts
└── types/              # TypeScript type definitions
    └── quiz.ts
```

## 6. Key Components and Logic

*   **`QuizContext.tsx`**: This context manages the entire state of the quiz, including current question, score, user answers, and quiz progression. It provides a centralized way to access and modify quiz-related data across different components.
*   **`useQuiz.ts`**: A custom hook that encapsulates the core logic for the quiz, interacting with `QuizContext` to provide functions for starting, answering, and resetting the quiz.
*   **`question-loader.ts`**: Responsible for loading quiz questions from the `data` directory based on the selected language.
*   **`pages/`**:
    *   `HomePage.tsx`: The landing page of the application, likely where the user starts the quiz.
    *   `QuizPage.tsx`: Displays the current quiz question and handles user interactions for answering.
    *   `ResultPage.tsx`: Shows the quiz results, including the score and potentially options to restart or share.
*   **`components/`**: Contains smaller, reusable UI elements like `QuestionCard` (for displaying individual questions) and `RewardScreen` (for post-quiz display). The `ui` subdirectory contains components generated or adapted from shadcn/ui.

## 7. Styling

The project uses **Tailwind CSS** for utility-first styling, enabling rapid UI development. **shadcn/ui** components are integrated, providing pre-built, accessible, and customizable UI elements that are styled with Tailwind CSS. Custom styles can be found in `App.css` and `index.css`.

## 8. Internationalization (i18n)

The application supports multiple languages using `i18next` and `react-i18next`.
*   Language-specific quiz questions are stored in `src/data/questions.en.json` (English) and `src/data/questions.ko.json` (Korean).
*   Text content throughout the application can be translated by utilizing the `useTranslation` hook from `react-i18next`.

## 9. Testing

Unit and integration tests are written using **Vitest** and **React Testing Library**.
*   Test files are typically located alongside the code they test (e.g., `useQuiz.test.ts` for `useQuiz.ts`).
*   To run all tests, use `npm run test`.
*   For detailed test reports or interactive debugging, `npm run test:ui` is available.

## 10. Build and Deployment

The project can be built for production using `npm run build`. The output will be in the `dist` directory, which can then be deployed to any static hosting service (e.g., Netlify, Vercel, GitHub Pages). The `vite.config.ts` includes optimizations like code splitting and asset hashing for better performance.

---
This document provides a comprehensive overview for new developers to quickly get up to speed with the FaceRead project. For more detailed information on specific modules or functionalities, please refer to the respective source code files and inline comments.
