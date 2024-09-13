export class Employee {
    employeeID: number
    employeeName: string
    employeeEmail: string
    employeePassword: string

    constructor(employeeID: number, employeeName: string, employeeEmail: string, employeePassword: string) {
        this.employeeID = employeeID
        this.employeeName = employeeName
        this.employeeEmail = employeeEmail
        this.employeePassword = employeePassword
    }

}