import { AppDataSource } from "../config/data-source.js";
import { Department } from "../entities/department.entity.js";

const departmentRepo = await AppDataSource.getRepository(Department);

export const getDepartment = async (department:string)=>{
    const data = await departmentRepo.findOne({
        where:{department}
    })
    return data
}

export const createDepartment = async (department:any)=>{
    const addDepartment = await departmentRepo.create(department)
    return await departmentRepo.save(addDepartment)
}