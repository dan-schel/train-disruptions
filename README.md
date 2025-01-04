# Train Disruptions

A hub for train disruption information in Melbourne and Victoria.

Very much still a work-in-progress!

✅ Beta deployment at https://beta.isitbuses.com.

## Getting started

Requires [NodeJS](https://nodejs.org/en) and [MongoDB](https://www.mongodb.com/).

1. Clone the repo:

   ```
   git clone https://github.com/dan-schel/train-disruptions.git
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set environment variables by creating a `.env` file as described [here](/docs/environment-variables.md#local-development-server) (under "Local development server").

4. Start the server:

   ```
   npm run dev
   ```

5. Navigate to http://localhost:3000.

## Docs

### General

- [Environment variables](/docs/environment-variables.md)
- [Scripts](/docs/scripts.md)
- [Tools](/docs/tools.md)
- [UI Conventions](/docs/ui-conventions.md)
- [Original Vike README.md](/docs/vike-readme.md)

### Database

- [Querying the database](/docs/database/querying-the-database.md)
- [Creating a new database model](/docs/database/creating-a-new-database-model.md)
