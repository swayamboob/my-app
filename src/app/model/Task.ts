import { Employee } from "./Employee"
import { Sprint } from "./Sprint"
import { Team } from "./Team"

export class Task {
    taskId: number
    taskName:string|null
    taskDetails: String | null
    taskStatus: string|null
    taskDeadline: Date|null
    taskStarted: Date|null
    taskSprint: Sprint|null
    taskAssigned: Employee|null
    taskCreatedBy: Employee|null
    taskTeam: Team|null
    constructor(taskId: number,taskName:string|null, taskDetails: string|null, taskStarted: Date,
        taskStatus: string|null, taskDeadline: Date|null, taskSprint: Sprint|null, taskAssigned: Employee|null, taskCreatedBy: Employee|null, taskTeam: Team|null ) {

            this.taskId=taskId;
            this.taskName=taskName;
            this.taskDetails=taskDetails;
            this.taskStatus=taskStatus
            this.taskDeadline=taskDeadline
            this.taskSprint=taskSprint
            this.taskAssigned=taskAssigned
            this.taskCreatedBy=taskCreatedBy
            this.taskTeam=taskTeam
            this.taskStarted=taskStarted;

    }

}