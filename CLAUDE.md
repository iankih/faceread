# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FaceRead is an interactive quiz web application built with React, TypeScript, and Vite. The app provides emotion recognition quizzes with multilingual support (Korean, English) and features three different quiz types: face-to-text, text-to-face, and eyes-to-text emotion recognition.

## Core Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 4 + shadcn/ui components
- **State Management**: React Context API with custom hooks
- **Routing**: React Router DOM v7
- **Animations**: Framer Motion
- **Internationalization**: i18next + react-i18next
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint + TypeScript ESLint

## Development Commands

```bash
# Development
npm run dev                 # Start development server with hot reload
npm run build              # Build for production (includes TypeScript compilation)
npm run preview            # Preview production build locally
npm run build:analyze      # Build with bundle analysis

# Testing
npm run test               # Run tests in watch mode
npm run test:run           # Run tests once
npm run test:ui            # Run tests with Vitest UI
npm run test:coverage      # Run tests with coverage report
npm run test:step3         # Run specific test for question loader

# Code Quality
npm run lint               # Run ESLint for TypeScript/React files
```

## Project Architecture

### Directory Structure
```
src/
├── components/           # Reusable UI components
│   └── ui/              # shadcn/ui components
├── pages/               # Page-level components (HomePage, QuizPage, ResultPage)
├── contexts/            # React Context providers (QuizContext)
├── hooks/               # Custom React hooks (useQuiz, useShare)
├── lib/                 # Utility functions and services
├── types/               # TypeScript type definitions
├── data/                # Quiz question data (JSON files by language)
└── locales/             # i18n translation files
```

### Key Components & Patterns

**State Management**: Uses React Context with `useQuiz` hook for quiz state management. The `QuizContext` provides global access to quiz state and actions.

**Question Loading**: Dynamic import system via `question-loader.ts` that loads language-specific question data with caching and retry logic. Questions are loaded as separate chunks for optimal performance.

**Type Safety**: Comprehensive TypeScript types in `src/types/quiz.ts` covering all quiz-related interfaces including questions, answers, and state management.

**UI Components**: Built with shadcn/ui components and Tailwind CSS. All UI text uses i18next for internationalization.

### Quiz System

The quiz supports two modes:
- **Standard Mode**: Fixed distribution (4 face2text, 3 text2face, 3 eyes2text questions)
- **Integrated Mode**: Random selection of 10 questions from all types

Questions are shuffled using Fisher-Yates algorithm and support caching for performance.

## Development Guidelines

### Path Aliases
Always use `@/` prefix for imports instead of relative paths:
```typescript
import { Button } from '@/components/ui/button'
import { useQuiz } from '@/hooks/useQuiz'
```

### Component Patterns
- Use functional components with React hooks
- Prefer shadcn/ui components for UI elements
- Apply Tailwind CSS for styling (no custom CSS files)
- Use Framer Motion for animations
- All text must use i18next `t()` function, never hardcoded strings

### Code Quality Standards
- TypeScript strict mode enabled with comprehensive type checking
- ESLint configured for React/TypeScript best practices
- Test coverage targets: 90% global, 85% for lib files, 80% for components
- Vitest setup with jsdom environment for component testing

### Performance Optimizations
- Dynamic imports for question data (language-specific chunks)
- Manual chunk splitting for vendor libraries in Vite config
- Asset optimization with 4KB inline threshold
- HMR optimizations for development

### Testing Strategy
- Component tests using React Testing Library
- Hook tests with custom hook testing utilities
- Mock setup in `src/test/setup.ts`
- Snapshot testing for UI components
- Specific test command for question loader: `npm run test:step3`

## Known Configuration Details

### Build Optimization
The Vite config includes sophisticated chunk splitting:
- React core libraries
- UI component libraries (@radix-ui)
- Internationalization libraries
- Router and animation libraries
- Utility libraries

### Environment Support
- Development: Hot reload with overlay disabled
- Production: Source maps disabled, esbuild minification
- Preview: Port 4173 with Docker compatibility
- Test: jsdom environment with comprehensive coverage reporting

### Language Support
Currently supports Korean (default) and English with extensible architecture for additional languages. Question data and translations are loaded dynamically based on user selection.

Sure, here are the rules formatted as you requested, within a code block and in English:

### rules
- Ensure Single Responsibility Principle: Each function or component should have one clear responsibility.
- Use Clear Naming Conventions: Variables, functions, and component names should clearly indicate their purpose and action.
- Enhance Modularity: Separate unrelated logic and abstract it into reusable modules or hooks.
- Minimize Dependencies: Reduce direct dependencies between components; consider dependency injection when necessary.
- Avoid Deep Nesting: Strive to keep code block nesting (e.g., if, for statements) to a maximum of three levels deep.
- Clarify State Management: Global state should only be managed through clearly defined contexts like `QuizContext`, avoiding mixing with local state.
- Isolate Side Effects: Logic causing side effects (e.g., data fetching, DOM manipulation) should be managed within `useEffect` hooks or separated into utility functions.
- Utilize Comments (When Necessary): Add concise comments for complex or business-critical logic to aid understanding for both AI and fellow developers.
- Keep Functions/Components Small: Maintain short function and component lengths for easy readability and comprehension.
- Maintain Consistent Code Style: Ensure a consistent code style across the project by adhering to ESLint and Prettier configurations.
- **답변은 한국어로 한다**