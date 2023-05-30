import type { Knex } from "knex";

const config: Knex.Config = {
  client: "sqlite3",
  connection: {
    filename: "./dev.sqlite3",
  },
  migrations: {
    directory: "src/database",
  },
  useNullAsDefault: true,
};

export default config;