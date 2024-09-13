import { Employee } from "./Employee"
import { EmployeeProfile } from "./EmployeeProfile"

export class EmployeeDetails {
    employeeProfile:EmployeeProfile
    jwt:String
    constructor() {
        this.employeeProfile = new EmployeeProfile()
        this.jwt = ''
    }

}