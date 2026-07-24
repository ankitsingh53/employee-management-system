import { addEmployee } from "../../services/employee/employeeService.js";
import {getAllEmployee} from '../../services/employee/employeeService.js';
import {updateEmployee} from '../../services/employee/employeeService.js';
import {deleteEmployee} from '../../services/employee/employeeService.js';
import {employeeByID} from '../../services/employee/employeeService.js'

export const employeeResolver = {

    Query: {
        getEmployee: async ()=>{
            return await getAllEmployee()
        },
        getEmployeeById: async (parent:any, args:{id:number})=>{
            const id = args.id
            return await employeeByID(Number(id))
        }
    },

    Mutation: {
        createEmployee: (parent:any, args:any, context:any)=>{
            const data = args.input;
            console.log(args)
            const stringPattern = /^[A-Za-z\s'-]+$/;
            if(!data.firstName.trim()){
                throw new Error("First name is required!")
            }
            else if(data.firstName.length<3) {
                throw new Error("Name cannot be less than 3 characters")
            }
            else if(!stringPattern.test(data.firstName)){
                throw new Error("Enter valid first name characters")
            }
            if(!data.lastName.trim()){
                throw new Error("Last name is required!")
            }
            else if(data.lastName.length<3) {
                throw new Error("Name cannot be less than 3 characters")
            }
            else if(!stringPattern.test(data.lastName)){
                throw new Error("Enter valid last name characters")
            }
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
            if(!data.email.trim()){
                throw new Error("Email is required!")
            }
            else if(!emailRegex.test(data.email)){
                throw new Error("Enter valid email address! (must include @ )")
            }
            const mobileValidation = /^(0|91)?[6-9][0-9]{9}$/;
            if(!data.phoneNumber.trim()){
                throw new Error("Mobile number is required !")
            }
            else if(!mobileValidation.test(data.phoneNumber)){
                throw new Error("Enter valid mobile number")
            }
            if(!data.designation.trim()){
                throw new Error("Designation is required !")
            }
            else if(!stringPattern.test(data.designation)){
                throw new Error("Enter valid characters")
            }
            const salaryRegex = /^(0|[1-9]\d*)(\.\d+)?$/
            if(!Number(data.salary)){
                throw new Error("Salary is required !")
            }
            else if(!salaryRegex.test(data.salary)){
                throw new Error("Enter only numeric characters")
            }
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/
            if(!data.joiningDate.trim()){
                throw new Error("Joining date is required")
            }
            else if(!dateRegex.test(data.joiningDate)){
                throw new Error("Enter date in 'yyyy-mm-dd' format")
            }
            return addEmployee(data)
        
        },

        updateEmployee: async (parent:any, args:any)=>{
            const {id, ...updatedData} = args.input;
            const stringPattern = /^[A-Za-z\s'-]+$/;
            if(!updatedData.firstName.trim()){
                throw new Error("First name is required!")
            }
            else if(updatedData.firstName.length<3) {
                throw new Error("Name cannot be less than 3 characters")
            }
            else if(!stringPattern.test(updatedData.firstName)){
                throw new Error("Enter valid first name characters")
            }
            if(!updatedData.lastName.trim()){
                throw new Error("Last name is required!")
            }
            else if(updatedData.lastName.length<3) {
                throw new Error("Name cannot be less than 3 characters")
            }
            else if(!stringPattern.test(updatedData.lastName)){
                throw new Error("Enter valid last name characters")
            }
            const mobileValidation = /^(0|91)?[6-9][0-9]{9}$/;
            if(!updatedData.phoneNumber.trim()){
                throw new Error("Mobile number is required !")
            }
            else if(!mobileValidation.test(updatedData.phoneNumber)){
                throw new Error("Enter valid mobile number")
            }
            if(!updatedData.designation.trim()){
                throw new Error("Designation is required !")
            }
            else if(!stringPattern.test(updatedData.designation)){
                throw new Error("Enter valid characters")
            }
            const salaryRegex = /^(0|[1-9]\d*)(\.\d+)?$/
            if(!Number(updatedData.salary)){
                throw new Error("Salary is required !")
            }
            else if(!salaryRegex.test(updatedData.salary)){
                throw new Error("Enter only numeric characters")
            }
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/
            if(!updatedData.joiningDate.trim()){
                throw new Error("Joining date is required")
            }
            else if(!dateRegex.test(updatedData.joiningDate)){
                throw new Error("Enter date in 'yyyy-mm-dd' format")
            }
            return await updateEmployee(id, updatedData)
        },

        deleteEmployee: async(parent:any, args:{id:number})=>{
            const id = args.id
            return await deleteEmployee(id)
        }
    }
}