import { AppDataSource } from "../../config/data-source.js";

import { Employee } from "../../entities/employee.entity.js";

const eventRepository = await AppDataSource.getRepository(Employee);

export const getAdmin = async(id:any)=>{
    const admin = await eventRepository.findOne({
        where:{
         id:id
       }
});
    if(!admin){
        throw new Error("No admin is there")
    }
    return admin
}