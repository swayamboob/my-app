import { Team } from "./Team"

export class Profile {
    employeeID: number
    employeeName: string
    employeeEmail: string
    employeeRole:string|null
    managerTeams: Team[]|null
    team:Team|null

    constructor(employeeID: number, employeeName: string, employeeEmail: string, employeePassword: string,employeeRole:string|null) {
        this.employeeID = employeeID
        this.employeeName = employeeName
        this.employeeEmail = employeeEmail
        this.employeeRole= employeeRole
        this.managerTeams=[]
        this.team=null;
    }

}