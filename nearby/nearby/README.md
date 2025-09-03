# Nearby Application

Welcome to the Nearby application! This guide will walk you through the setup process step by step to get both the API and client running on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- pnpm (Package Manager)
- PostgreSQL
- Git

## Installation Steps

### 1. Clone the Repository

Choose one of the following methods to clone the repository:

### 2. Setting up the API

Navigate to the API directory and install dependencies:

```bash
cd nearby/API
pnpm install
```

Create and configure your environment variables:

```bash
# Create a new .env file
touch .env

# Add the following configuration to your .env file
PORT=8000
NODE_ENV=development
DATABASE_URL="postgresql://REPLACETHIS:PASSWORD@172.17.0.2:5432/nearby?schema=public"
```

Important: Replace `REPLACETHIS` and `PASSWORD` in the DATABASE_URL with your actual PostgreSQL credentials.

Initialize the database:

```bash
# Choose one of the following commands
npx prisma db push
# OR
npx prisma migrate
```

Start the API server:

```bash
pnpm start:dev
```

### 3. Setting up the Client

Open a new terminal window and navigate to the client directory:

```bash
cd nearby/client
pnpm install
pnpm run dev
```

## Accessing the Application

Once both servers are running, you can access:

- Backend GraphQL Playground: [http://localhost:8000/graphql](http://localhost:8000/graphql)
- Frontend Application: [http://localhost:3000](http://localhost:3000)

## Important Notes

- Do not modify the port numbers for either the backend (8000) or frontend (3000) as this may cause connectivity issues
- Ensure your PostgreSQL server is running before starting the API
- Keep both the API and client terminals running while using the application

## Troubleshooting

If you encounter any issues:

1. Verify that PostgreSQL is running and accessible
2. Ensure all environment variables are correctly set
3. Check that no other applications are using ports 8000 or 3000
4. Confirm that all dependencies were installed correctly using pnpm
