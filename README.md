# my-better-t-app-6

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines Next.js, Next, ORPC, and more.

## Features

- **TypeScript** - For type safety and improved developer experience
- **Next.js** - Full-stack React framework
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **Next.js** - Full-stack React framework
- **oRPC** - End-to-end type-safe APIs with OpenAPI integration
- **Bun** - Runtime environment
- **Mongoose** - TypeScript-first ORM
- **MongoDB** - Database engine
- **Authentication** - Email & password authentication with Better Auth
- **Biome** - Linting and formatting
- **Husky** - Git hooks for code quality

## Getting Started

First, install the dependencies:

```bash
bun install
```
## Database Setup

This project uses MongoDB with Mongoose.

1. Make sure you have MongoDB set up.
2. Update your `apps/server/.env` file with your MongoDB connection URI.

3. Apply the schema to your database:
```bash
bun db:push
```


Then, run the development server:

```bash
bun dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the web application.
The API is running at [http://localhost:3000](http://localhost:3000).



## Project Structure

```
my-better-t-app-6/
├── apps/
│   ├── web/         # Frontend application (Next.js)
│   └── server/      # Backend API (Next, ORPC)
```

## Available Scripts

- `bun dev`: Start all applications in development mode
- `bun build`: Build all applications
- `bun dev:web`: Start only the web application
- `bun dev:server`: Start only the server
- `bun check-types`: Check TypeScript types across all apps
- `bun db:push`: Push schema changes to database
- `bun db:studio`: Open database studio UI
- `bun check`: Run Biome formatting and linting
