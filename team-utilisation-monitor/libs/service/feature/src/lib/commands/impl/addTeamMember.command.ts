export class AddTeamMemberCommand{
  constructor(
    public readonly TeamName:string,
    public readonly EmployeeEmail:string
  ){}
}
