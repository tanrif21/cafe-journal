# Setup and Deployment

## Getting Started

### 1. Upload to GitHub

Extract the project ZIP and upload its contents to a new repository. Keep `package.json`, `vercel.json`, `schema.sql`, and the `api`, `lib`, and `public` folders at the repository root.

### 2. Set Up the Database

Create a PostgreSQL project on [Neon](https://neon.com). Run the contents of `schema.sql` in its SQL Editor, then copy the database connection string.

### 3. Deploy to Vercel

Import the GitHub repository into [Vercel](https://vercel.com). Choose **Other** as the framework preset and use the repository root as the root directory. The included `vercel.json` configures the build command and static output directory.

Add the following environment variables before deploying:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Your Neon PostgreSQL connection string |
| `GROUP_PASSWORD` | A group password with at least 12 characters |
| `SESSION_SECRET` | A separate random signing secret with at least 32 characters |

Generate a signing secret with Node.js:

```sh
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Keep real credentials in Vercel's environment settings. Do not commit them to GitHub. Redeploy after changing environment variables. When changing the group password, rotate the session secret as well to invalidate existing sessions.

### 4. Bring Your Records Along

A new database starts empty. To transfer records from an earlier version, export its data as JSON, then use **Import JSON backup** in the new app. Records are not automatically transferred between domains or databases.

## Project Checks

Requires Node.js 22.

```sh
npm install
npm run build
npm test
```

The checks cover source files, routing, authentication, shared records, conflicting updates, database parameter conversion, and failed-login limits. A live deployment still needs to be verified against its configured Neon database.

## Access and Scope

This is a personal project designed for a small group of friends. Everyone with the group password can add, edit, and delete records; there are no separate owner and member roles. Shared updates require an internet connection. Hosting and database usage remain subject to the providers' plan limits.

Treats are recorded as gifts. The app does not calculate debts or repayments.

