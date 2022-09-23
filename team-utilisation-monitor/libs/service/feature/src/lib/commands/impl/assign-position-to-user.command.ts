export class AssignPositionToUserCommand{
    constructor(
        public position_name:string,
        public assignee_email:string,
        public teamName:string,
    ){}
}