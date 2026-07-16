import { AppDataSource } from "../../config/data-source.js";
import { Employee } from "../../entities/employee.entity.js";

const employeeRepo = await AppDataSource.getRepository(Employee)

export const getAllEmployee = async()=>{
    const employeeDetails = await employeeRepo.find({
        where: {
            role: "EMPLOYEE"
        }
    });
    if(!employeeDetails){
        throw new Error("No employee has been registered yet!")
    }
    return employeeDetails;
}
export const employeeByID = async (id:number)=>{
    const getEmployeeDetails = await employeeRepo.findOne({
        where:{
            role: "EMPLOYEE",
            id
        }
    })
    if(!getEmployeeDetails){
        throw new Error("Employee not found")
    }
    return await getEmployeeDetails;
}
export const addEmployee = async(data:any)=>{
    const existingEmployee = await employeeRepo.findOne({
        where: {
            role: "EMPLOYEE",
            email: data.email
        }
    })
    if(existingEmployee?.email.length){
        throw new Error("Employee already exit.")
    }
    const createEmployee = employeeRepo.create(data)
    return await employeeRepo.save(createEmployee)
}

export const updateEmployee = async(id:number, updatedData:any)=>{
    const getEmployee = await employeeRepo.findOne({
        where: {
            id,
            role: "EMPLOYEE",
        }
    })
    if(!getEmployee){
        throw new Error("Employee not found")
    }
    Object.assign(getEmployee, updatedData)
    return await employeeRepo.save(getEmployee)
}

export const deleteEmployee = async (id:number)=>{
    const getEmployee = await employeeRepo.findOne({
        where: {
            role: "EMPLOYEE",
            id
        }
    })
    if(!getEmployee){
        throw new Error("Employee not found")
    }
    await employeeRepo.remove(getEmployee)
    return {
        message: "Employee deleted successfully"
    }
}