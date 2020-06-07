Steps to run this project:

1. Run `yarn` command
2. You have 2 options:
* Create empty Postgres DB, for example, on Heroku and get database URL.
* If instead you want to use `ormconfig.json` file, you need to remove the parameter in `src/index.ts` createConnection() call and you may not specify DATABASE_URL in `.env`.
3. Create `.env` file in root folder with following:
```
DATABASE_URL=postgres://path-to-postgresdb
ALLOWED_ORIGIN=http://localhost:3000
```
3. Run `yarn start` command
