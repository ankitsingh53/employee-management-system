import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";


@Entity("employees")
export class Employee {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: "varchar", length: 200})
  firstName!: string;

  @Column({type: "varchar", length: 200})
  lastName!: string;

  @Column({type: "varchar", length: 200,  unique: true})
  email!: string;

  @Column({type: "varchar", nullable: true})
  password!: string;

  @Column({ type: "varchar",length: 10, unique: true, nullable: true})
  phoneNumber!: string;

  @Column({type: "varchar", length: 100, nullable: true})
  designation!: string;

  @Column( {type: "decimal", precision: 10, scale: 2, nullable: true})
  salary!: number;

  @Column({type: "date", nullable: true})
  joiningDate!: Date;

  @Column({type: "varchar", length: 20, default: "EMPLOYEE"})
  role!: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive!: boolean;

 @CreateDateColumn({
    type: "timestamp",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: "timestamp",
  })
  updatedAt!: Date;
}

