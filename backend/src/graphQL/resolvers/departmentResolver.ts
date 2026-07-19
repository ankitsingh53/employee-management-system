import {createDepartment, getAllDepartment} from '../../services/departmentService.js';
import { changeDepartment } from '../../services/departmentService.js';
import { removeDepartment } from '../../services/departmentService.js';

export const departmentResolver = {
    Query: {
        viewDepartment: async ()=>{
            return await getAllDepartment()
        }
    },
    Mutation: {
        addDepartment: async (parent:any, args:any)=>{
            const {department} = args.input;
            const stringPattern = /^[A-Za-z\s'\-\/\\ ]+$/;
            if(!department.trim()){
                throw new Error("Department is required and cannot be empty.")
            }
            else if(!stringPattern.test(department)){
                throw new Error("Only Characters are allowed")
            }

            return await createDepartment(department)
        
        },

        updateDepartment: async(parent:any, args:any)=>{
            const {id, ...data} = args.input;
            const stringPattern = /^[A-Za-z\s'\-\/\\ ]+$/;
            if(!data.department.trim()){
                throw new Error("Department is required and cannot be empty.")
            }
            else if(!stringPattern.test(data.department)){
                throw new Error("Only Characters are allowed")
            }

            return await changeDepartment(id, data)
        },

        deleteDepartment: async(parent:any, args:any)=>{
            const id = args.id;
            return await removeDepartment(id);
        }
    }
}