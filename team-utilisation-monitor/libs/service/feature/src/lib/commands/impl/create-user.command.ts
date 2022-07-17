export class CreateUserCommand{
    constructor(
        public  name:string,
        public surname:string,
        public email:string,
        public  inviteLink:string
    ){}
}