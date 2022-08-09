export class VerifyTokenCommand{
    constructor(
        public email:string,
        public token:string,
    ){}
}