import * as process from "node:process";

import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + "/../src/**/*.entity.{ts,js}"],
  migrations: [__dirname + "/migrations/*.ts"],
  synchronize: false,
  logging: true,
};

export const AppDataSource = new DataSource(dataSourceOptions);
