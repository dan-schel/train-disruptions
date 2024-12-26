# Train Disruptions

A hub for train disruption information in Melbourne and Victoria.

Very much still a work-in-progress!

✅ Beta deployment at https://beta.isitbuses.com.

## Getting started

Requires [NodeJS](https://nodejs.org/en) installed.

1. Clone the repo:

   ```
   git clone https://github.com/dan-schel/train-disruptions.git
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file with the following content:

   ```dotenv
   # The connection string to your locally running MongoDB server. If you do not
   # have a locally running MongoDB server yet, do not add this line.
   # e.g. "mongodb://username:password@localhost:27017/?authMechanism=DEFAULT"
   DATABASE_URL="..."

   # This value is a secret password which won't be committed to GitHub.
   # If you have not been provided this value, do not add this line.
   RELAY_KEY="..."
   ```

4. Start the server:

   ```
   npm run dev
   ```

5. Navigate to http://localhost:3000.

## Docs

- [Environment variables](/docs/environment-variables.md)
- [Scripts](/docs/scripts.md)
- [Tools](/docs/tools.md)
- [Original Vike README.md](/docs/vike-readme.md)
