import { Employee } from "./Employee"
import { Task } from "./Task"

export class Team{
    teamName:string
    teamId:number
    teamManager:Employee|null
    teamMembers:Employee[]|null
    teamTask: Task[]|null
    constructor(teamName:string,teamId:number, teamManager:Employee|null,teamMembers:Employee[]|null,teamTask:Task[]|null){
        this.teamName=teamName
        this.teamId=teamId
        this.teamManager= teamManager
        this.teamMembers=teamMembers
        this.teamTask=teamTask
    }

}