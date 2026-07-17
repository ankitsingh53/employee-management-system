import {getDepartment} from '../../services/departmentService.js';
import {createDepartment} from '../../services/departmentService.js';

export const departmentResolver = {
    Query: {

    },
    Mutation: {
        addDepartment: async (parent:any, args:any)=>{
            const {department} = args.input;
            const stringPattern = /^[A-Za-z\s'-]+$/;
            if(!department.trim()){
                throw new Error("Department is required cannot be empty.")
            }
            else if(!stringPattern.test(department)){
                throw new Error("Only Characters are allowed")
            }
            const exitDepartment = await getDepartment(department)
            if(exitDepartment){
                throw new Error("Department already exist!")
            }
            return await createDepartment(department)
        
        }
    }
}