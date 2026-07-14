import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "@nkit123",
    database: "ems",
    synchronize: true,
    logging: true,
    // entities: []
})