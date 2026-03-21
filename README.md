# Todo List with React + TypeScript

A web app to manage daily tasks with a clean, fast, and productivity-focused interface.

This project was built to practice React, TypeScript, and state management with hooks, while applying good development practices and a scalable project structure for portfolio use.

## Demo

Add your deployed URL here once published:

- Production: `https://your-demo-url.com`

## Features

- Create new tasks.
- Delete individual tasks.
- Mark tasks as completed or pending.
- Clear all completed tasks.
- Filter by status: `all`, `completed`, `pending`.
- Progress counter (`x of y completed`).
- Light/Dark theme switch.
- `localStorage` persistence.
- Cross-tab sync through the `storage` event.

## Tech Stack

- React 19
- TypeScript
- Vite
- ESLint
- pnpm

## Installation and Run

Requirements:

- Node.js 20+
- pnpm

Steps:

```bash
pnpm install
pnpm run dev
```

The app runs at `http://localhost:5173`.

## Available Scripts

```bash
pnpm run dev      # development server
pnpm run build    # production build (tsc + vite)
pnpm run preview  # preview production build
pnpm run lint     # static analysis with ESLint
pnpm run test     # run test suite once
pnpm run test:unit # run only unit tests
pnpm run test:integration # run only integration tests
pnpm run test:watch # run tests in watch mode
pnpm run test:coverage # generate test coverage report
pnpm run test:ci # run coverage checks used in CI
```

## Testing

- Test runner: Vitest
- UI testing: React Testing Library + user-event
- Assertions: jest-dom matchers

Current coverage includes:

- Persistence helpers for tasks/filter/theme.
- Task context behavior (add, update, delete, clear completed, and filter updates).

Test structure:

- `src/tests/unit`: visual component tests and utility tests in isolation.
- `src/tests/integration`: full flow tests wiring real providers and UI interactions.

Minimum coverage enforced in CI:

- Statements: 80%
- Branches: 70%
- Functions: 80%
- Lines: 80%

## Learning Goals

- Model data and state with TypeScript.
- Use Context API for shared global state.
- Encapsulate logic in reusable hooks.
- Keep UI state synchronized with `localStorage`.
- Apply a maintainable structure for small/medium projects.

## Future Improvements

- Expand tests to include UI components and cross-tab synchronization events.
- Improve accessibility (keyboard navigation and ARIA).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

Built by [Fernando Sánchez Jumbo](https://github.com/JFSJ25) as a practice project and portfolio piece.
