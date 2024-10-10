# Paytm - Payment Wallet

## Project Overview

Paytm is a payment wallet application built with a modern tech stack, featuring a Next.js frontend for users and an Express backend to handle bank responses. The project is structured using Turborepo for efficient monorepo management.

### Key Features

- User-friendly Next.js frontend for wallet management
- Express backend to process bank responses
- Ability to add money to wallet (redirects to bank page)
- User-to-user money transfer functionality
- CI/CD pipeline for automated builds and deployments
- Docker support for containerization

## Tech Stack

- Turborepo
- Next.js
- Express.js
- PostgreSQL
- Docker
- CI/CD (details to be added)

## Prerequisites

- Node.js and npm
- Docker (for running PostgreSQL or containerizing the application)
- PostgreSQL (local or cloud-based, e.g., neon.tech)

## Installation and Setup

1. Clone the repository:

   ```
   git clone https://github.com/awaiskhan21/paytm
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up PostgreSQL:

   - Option 1: Run locally using Docker:
     ```
     docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
     ```
   - Option 2: Use a cloud-based solution like neon.tech

4. Configure environment variables:

   - Copy all `.env.example` files to `.env` in their respective directories
   - Update the `.env` files with the correct database URL and other necessary information

5. Set up the database:

   ```
   cd packages/db
   npx prisma migrate dev
   npx prisma db seed
   ```

6. Start the user application:

   ```
   cd apps/user-app
   npm run dev
   ```

7. Start the bank webhook (Express backend):
   ```
   cd apps/bank-webhook
   npm run dev
   ```

Alternatively, you can run both applications from the root directory:

```
npm run dev
```

## Usage

1. Access the user application by opening a web browser and navigating to `http://localhost:3000` (or the appropriate port)
2. Log in using the following credentials:
   - Phone: 1111111111
   - Password: alice
     (These credentials are set up in the `seed.ts` file)

## Development

To work on the project:

1. Make your changes in the appropriate packages or apps
2. Commit your changes and create a pull request
3. The CI pipeline will automatically check if the project builds successfully
4. Once merged to the master branch, the CI/CD pipeline will build and deploy the Docker image to Docker Hub
