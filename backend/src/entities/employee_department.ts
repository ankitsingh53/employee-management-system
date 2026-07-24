// import {
//   Entity,
//   Column,
//   ManyToMany,
//   JoinColumn,
//   PrimaryGeneratedColumn,
// } from 'typeorm';
// import {Employee} from './employee.entity.js';
// import {Department} from './department.entity.js';

// @Entity("employee_department")
// export class EmployeeDepartment {
//   @PrimaryGeneratedColumn()
//   id!: number;

//   @Column({type:"number"})
//   employee_id!: number;

//   @Column({type:"number"})
//   department_id!: number;

//   @ManyToMany(() => Employee, employees => employees.departments)
//   @JoinColumn({ name: 'employee_id' })
//   employees!: Employee;

//   @ManyToMany(() => Department, departments => departments.employees)
//   @JoinColumn({ name: 'department_id' })
//   departments!: Department;
// }