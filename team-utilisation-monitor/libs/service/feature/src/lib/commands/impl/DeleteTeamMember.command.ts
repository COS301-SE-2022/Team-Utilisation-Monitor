export class DeleteTeamMemberCommand
{
  constructor(public readonly teamName:string,public readonly email:string){}
}
