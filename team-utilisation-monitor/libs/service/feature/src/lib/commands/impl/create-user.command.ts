export class CreateUserCommand{
    constructor(
        public  name:string,
        public surname:string,
        public email:string,
        public password:string,
        public  inviteLink:string
    ){}
}