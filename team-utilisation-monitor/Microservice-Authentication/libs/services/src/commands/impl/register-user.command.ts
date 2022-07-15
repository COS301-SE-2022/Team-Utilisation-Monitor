export class RegisterUserCommand{
    constructor(public readonly username:string,
        public readonly password:string
    ){}
}