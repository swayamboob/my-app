import { Employee } from "./Employee"
import { Task } from "./Task"

export class Sprint{
    sprintId:number
    sprintName:string|null
    sprintStart:Date|null
    sprintEnd:Date|null
    sprintGoal!:string
    sprintManager:Employee|null
    taskList: Task[]|null
    status:string|null
    constructor(
        sprintId:number,
    sprintName:string|null,
    sprintStart:Date|null,
    sprintEnd:Date|null,
    sprintManager:Employee|null,
    taskList: Task[]|null,
    status:string|null,
    ){
        this.sprintId=sprintId
        this.sprintName=sprintName
        this.sprintStart=sprintStart
        this.sprintEnd=sprintEnd
        this.sprintManager=sprintManager
        this.taskList= taskList
        this.status=status
    }

}