export class CreateProjectCommand{
    constructor(
        public readonly projectName:string,
        public readonly teamName:string,
        public readonly companyName:string,
        public readonly manHours:number
    ){}
}