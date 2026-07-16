import bcrypt from 'bcrypt'

export const hashPassword = async (plainPassword:any)=>{
    return await bcrypt.hash(plainPassword, 10);
};

export const comparePassword = async (plainPassword:any, hashPassword:any)=>{
    // console.log(plainPassword, hashPassword)
    return await bcrypt.compare(plainPassword, hashPassword);
};