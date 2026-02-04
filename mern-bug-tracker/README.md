# MERN Bug Tracker

A simple MERN bug tracker with a focus on testing and debugging practices. The UI uses a white and green color palette with a clean, no-gradient design.

## Features
- Create, view, update, and delete bugs
- Status updates: `open`, `in-progress`, `resolved`
- Backend error handling with Express middleware
- Client-side error boundary
- Unit and integration tests for server and client

## Tech Stack
- Node.js, Express, MongoDB (Mongoose)
- React (React Testing Library) with Vite
- Jest, Supertest, mongodb-memory-server

## Project Structure
```
mern-bug-tracker/
  client/
  server/
  jest.config.js
```

## Setup
1. Install dependencies:
```
cd mern-bug-tracker
npm run install-all
```
If you update dependency versions later, re-run `npm run install-all` to refresh the lockfile.

2. Create a server env file:
```
cd server
copy .env.example .env
```

3. Start the app (runs server and client):
```
cd ..
npm run dev
```

Server runs on `http://localhost:5000` and the client on `http://localhost:5173` (or the next available port).

## Tests
From `mern-bug-tracker/`:
```
npm test
npm run test:unit
npm run test:integration
npm run test:server
npm run test:client
```

## Debugging Techniques Used
- Console logging in server controllers and client hooks
- Chrome DevTools for network requests and component state
- Node.js inspector (run server with `node --inspect src/server.js`)
- React Error Boundary to catch UI crashes

## Intentional Bug Ideas (for practice)
- Send a request without a `title` to verify validation messages
- Temporarily comment out `await` in a controller to observe race conditions
- Return a non-JSON response from the server to inspect frontend error handling

## Testing Strategy
- Unit tests: validation helpers and UI validation
- Integration tests: API routes (Supertest + in-memory DB) and client App flow (mocked fetch)
- Mocking: `jest.mock` used to mock database/model calls in controller unit tests
- Coverage target: 70%+

## Debugging Checklist (What Was Used)
- Console logs in controllers to trace requests and IDs
- Chrome DevTools Network + React component inspection
- Node inspector (`node --inspect src/server.js`)
- React Error Boundary for UI crash safety

## Notes
This project is designed to demonstrate testing and debugging best practices for MERN applications.
