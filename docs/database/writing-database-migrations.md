## Writing database migrations

Anytime you want to change the type of a database model, e.g. to add a new field, you need to also update all existing records in the database to match. That's what database migrations are for!

A database migration will always require 2 separate PRs. The first PR updates the model to support both the old and new shape of the data. The second PR adds the database migration, and can remove the backwards compatibility (i.e. the database model now only needs to support the new shape of the data).

(Once you're confident the migration has run everywhere it needs to, the migration code can be removed as well, but there's no rush. The longer the migration code sticks around for, the better really. If a dev hasn't loaded up the project in a while and the migration has been deleted, they'll have no choice but to reset their local database.)

The reason the first PR is required to be separate is because when any new code is deployed, in order to prevent any downtime while the new server boots up, DigitalOcean keeps the old server alive until it sees that the new server is ready and listening. The database migration code runs as the new server is starting up, so there might be a short period of time where the data has been updated, but the old server is still running. If the old server was unable to handle the updated data model, we'd see errors. The new server doesn't need to understand the old data shape, because the migration is guaranteed to have run first thing before it does anything else.

In a world where we have multiple instances of our server running at once (horizontal scaling), this could change. Presumably only one server would be tasked with completing the migration, so we'd need to ensure that new copies aren't launched until it's done (i.e. they could sleep until they notice the migration is complete). That, or we could move to a three PR approach.
