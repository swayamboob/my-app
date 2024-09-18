export class User {
    employeeID: number
    employeeName: string
    employeeEmail: string
    employeePassword: string
    employeeRole:string|null

    constructor(employeeID: number, employeeName: string, employeeEmail: string, employeePassword: string,employeeRole:string|null) {
        this.employeeID = employeeID
        this.employeeName = employeeName
        this.employeeEmail = employeeEmail
        this.employeePassword = employeePassword
        this.employeeRole= employeeRole
    }

}