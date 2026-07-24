import { AppDataSource } from "../config/data-source.js";
import { Employee } from "../entities/employee.entity.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";

const profileRepo = await AppDataSource.getRepository(Employee);

export const getProfile = async (id:number)=>{
    const data = await profileRepo.findOne({
        where:{
            id,
            role: "EMPLOYEE"
        },
        relations:{
            department:true
        }
    });
    if(!data){
        throw new Error("No Employee found")
    }
    return data;
};

export const changePassword = async (data:any)=>{
    const getUser = await profileRepo.findOne({
        where:{
            id: data.id
        }
    })
    if(!getUser){
        throw new Error("Current user is not found")
    }
     console.log(getUser)

      const isMatch = await comparePassword(data.currentPassword, getUser.password);
      if(!isMatch){
        throw new Error("Current Password is wrong!!")
      }
      const hashNewPassword = await hashPassword(getUser.password);
      console.log(hashNewPassword)
      
      getUser.password = hashNewPassword;

      await profileRepo.save(getUser);
      return {
        message: "Password changed successfully."
      }
}

