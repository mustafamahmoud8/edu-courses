# Edu Courses 

A modern, responsive course player application built with Next.js, React, and TypeScript. Designed to deliver interactive lessons, course materials, student discussions, and quizzes/exams with persistent progress tracking.

## Tech Stack & Tools

- **Framework:** Next.js (App Router)
- **Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 & PostCSS
- **UI Components:** Radix UI primitives & Lucide React icons
- **Animations:** Motion

## Project Structure

```text
src/
├── app/                  # Next.js App Router pages and layouts
│   ├── layout.tsx        # Root layout with font and global styles
│   ├── page.tsx          # Home page container
│   └── globals.css       # Global styles and design tokens
├── components/           # Reusable UI components
│   ├── ui/               # Radix-based primitives (dialog, accordion, progress, button)
│   ├── courses/          # Course specific modules (outline, materials, shell, modals)
│   ├── exam/             # Quiz and exam modals and hooks
│   ├── course-video.tsx  # Video player component
│   └── comments.tsx      # Student comments section
├── data/                 # Static data and mock content
└── type/                 # TypeScript type definitions
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm start`: Runs the production server.
- `npm run typecheck`: Runs TypeScript compiler check without emitting files.
