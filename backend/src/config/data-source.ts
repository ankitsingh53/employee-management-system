import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Employee } from "../entities/employee.entity.js";
import { Department } from "../entities/department.entity.js";
import { Leave } from "../entities/leaveEntity.js";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL!,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: false,
  entities: [Employee, Department, Leave],
});
