import { Employee } from "./Employee"
import { EmployeeProfile } from "./EmployeeProfile"

export class EmployeeDetails {
    employeeProfile:EmployeeProfile
    jwt:string
    constructor() {
        this.employeeProfile = new EmployeeProfile()
        this.jwt = ''
    }

}