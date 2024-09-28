# Blogify

Blogify is a place where users can log into to share their thoughts, idea and experiences.

[System Design](https://excalidraw.com/#json=-UNyj3YgL0ijgmUiYz3I2,jyLdpomiGPRlYMrrF2xujA) outlining the architecture of application, describes how different components interact, data flow, and the reasoning behind the design decisions.

## Key Features

- User-friendly design
- Login and registration process
- Create, update, view, and delete post
- Engage with others through comments, with options to add and remove feedback

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js: [Download and install Node.js](https://nodejs.org/)

## Installation

#### Clone the repository:

```bash
git clone git@github.com:MohammadShehadeh/blogify.git
cd blogify
```

#### Select the desired Node.js version:

```bash
nvm use
```

- nvm: [Installing and Updating](https://github.com/nvm-sh/nvm#installing-and-updating)

### Environment Variables

The following environment variables are required for the proper functioning of the project.\
Create a `.env` file in the root directory and add the following values:

#### `NEXT_PUBLIC_VERCEL_URL`

- The base URL for the Vercel deployment of your application.
- Example: `NEXT_PUBLIC_VERCEL_URL=https://your-vercel-app.vercel.app`

#### `POSTGRES_PRISMA_URL`

- The Prisma connection URL for the PostgreSQL database.
- Example: POSTGRES_PRISMA_URL=postgres://user:password@host:port/database

#### `POSTGRES_URL_NON_POOLING`

- The non-pooling connection URL for the PostgreSQL database.
- Example: POSTGRES_URL_NON_POOLING=`postgres://user:password@host:port/database`

#### `AUTH_SECRET`

- A secret key used for signing session cookies to maintain user sessions.
- Example: `AUTH_SECRET=your_secure_secret_key`

#### Install dependencies:

```bash
npm ci
```

#### Run the project:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

In the project directory, you can run:

#### Build for Production:

```bash
npm run build
```

Builds the app for production to the `.next` folder.\
It correctly bundles Next in production mode and optimizes the build for the best performance.

note: make sure to create a `.env` file in the root directory before running this command

#### Run in Production Mode:

```bash
npm run start
```

Execute this script to run the Next.js app in production mode. Once the app is running,\
you can access it in the browser at [http://localhost:3000](http://localhost:3000)\
This command is typically used after running the `npm run build` script.

#### Format Code with Prettier:

```bash
npm run prettier
```

Prettier is used for code formatting. To ensure consistent formatting throughout the project.\
This command will automatically format the code based on the rules defined in the `.prettierrc.js`\
configuration file.

#### Run Linter:

```bash
npm run lint
```

Run the linter to analyze the code for potential errors.

#### Run Unit tests:

```bash
npm run test
```

Run the tests to analyze the code for potential bugs.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your
feedback and contributions are welcome!
