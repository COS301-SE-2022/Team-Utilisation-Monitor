export class GetAllProjectsOrTeamsOfCompany{
    constructor(
        public readonly company_name:string,
        public readonly contentType:number,
    ){}
}