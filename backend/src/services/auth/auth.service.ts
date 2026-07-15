import { AppDataSource } from "../../config/data-source.js";

import { Employee } from "../../entities/employee.entity.js";

const authRepo = await AppDataSource.getRepository(Employee);

export const authAdmin = async(email:any)=>{
    const getAdmin = authRepo.findOne({
        where: {
            email,
            role: "ADMIN",
        },
    });

    return getAdmin;
}