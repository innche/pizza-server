import "dotenv/config";
import * as PostgressConnectionStringParser from "pg-connection-string";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const databaseUrl: string = process.env.DATABASE_URL!;
const connectionOptions = PostgressConnectionStringParser.parse(databaseUrl);
export const dbOptions: PostgresConnectionOptions = {
  type: "postgres",
  host: connectionOptions.host!,
  port: Number.parseInt(connectionOptions.port!),
  username: connectionOptions.user,
  password: connectionOptions.password,
  database: connectionOptions.database!,
  synchronize: true,
  logging: false,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber"
  },
  extra: {
    ssl: true
  },
  ssl: {
    rejectUnauthorized: false
  }
};
