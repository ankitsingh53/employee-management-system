import { AppDataSource } from "../config/data-source.js";
import { Employee } from "../entities/employee.entity.js";

const profileRepo = await AppDataSource.getRepository(Employee);

export const getProfile = async (id:number)=>{
    const data = await profileRepo.findOne({
        where:{
            id,
            role: "EMPLOYEE"
        }
    });
    if(!data){
        throw new Error("No Employee found")
    }
    return data;
}