export class CreateTeamCommand{
    constructor(
        public readonly teamName:string,
        public readonly companyName:string
    ){}
}