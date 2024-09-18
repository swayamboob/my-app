export class Employee {
    employeeID: number
    employeeName: string
    employeeEmail: string
    employeeRole:string|null

    constructor(employeeID: number, employeeName: string, employeeEmail: string, employeePassword: string,employeeRole:string|null) {
        this.employeeID = employeeID
        this.employeeName = employeeName
        this.employeeEmail = employeeEmail
        this.employeeRole= employeeRole
    }

}