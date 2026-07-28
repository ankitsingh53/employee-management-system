import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  type Relation
} from "typeorm";

import { Employee } from "./employee.entity.js";

@Entity("leaves")
export class Leave {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "varchar",
    length: 30,
  })
  leaveType!: string;

  @Column({
    type: "date",
  })
  startDate!: Date;

  @Column({
    type: "date",
  })
  endDate!: Date;

  @Column({
    type: "text",
  })
  reason!: string;

  @Column({
    type: "varchar",
    default: "PENDING",
  })
  status!: string;

  @ManyToOne(() => Employee, (employee) => employee.leaves, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "employeeId",
  })
  employee!: Relation<Employee>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}