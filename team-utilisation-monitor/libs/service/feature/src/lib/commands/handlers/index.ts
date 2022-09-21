import { DeleteTeamHandler } from './DeleteTeam.handler';
import { DeleteProjectHandler } from './DeleteProject.handler';
import { CompleteProjectHandler } from './CompleteProject.handler';
import { DeleteTeamMemberHandler } from './DeleteTeamMember.handler';
import { ApproveRequestVEmailHandler } from "./approve-request-v-email.handler";
import { CreateAdminHandler } from "./create-admin.handler";
import { CreateCompanyHandler } from "./create-company.handler";
import { CreateInviteCodeHandler } from "./create-invite-code.handler";
import { CreateProjectHandler } from "./create-project.handler";
import { CreateTeamHandler } from "./create-team.handler";
import { CreateUserHandler } from "./create-user.handler";
import { AddTeamMemberHandler } from "./addTeamMember.handler";
import { DeleteEmployeeHandler } from './DeleteEmployee.handler';
import { AddSkillHandler } from './AddSkill.handler';
import { UpdateProfileHandler } from './UpdateProfile.handler';
import { AssignProjectToTeamHandler } from './assign-project-to-team.handler';
import { AssignProjectToTeamVNamesHandler } from './assign-project-to-team-vname.handler';
import { UpdateUserSkillHandler } from './UpdateUserSkill.handler';
import { AssignHoursHandler } from './AssignHours.handler';
import { CalculateUtilizationHandler } from './CalculateUtilisation.handler';
import { SetTokeHandler } from './set-token.handler';
import { VerifyTokenHandler } from './verify-token.handler';
import { RemoveSkillHandler } from './remove-skills.handler';
import { AddPositionHandler } from './AddPosition.handler';

export const CommandHandlers=[
  ApproveRequestVEmailHandler,
  CreateAdminHandler,
  CreateTeamHandler,
  CreateProjectHandler,
  CreateCompanyHandler,
  CreateUserHandler,
  CreateInviteCodeHandler,
  AddTeamMemberHandler,
  DeleteTeamMemberHandler,
  DeleteEmployeeHandler,
  AddSkillHandler,
  UpdateProfileHandler,
  AssignProjectToTeamHandler,
  AssignProjectToTeamVNamesHandler,
  UpdateUserSkillHandler,
  AssignHoursHandler,
  CalculateUtilizationHandler,
  CompleteProjectHandler,
  DeleteProjectHandler,
  SetTokeHandler,
  VerifyTokenHandler,
  RemoveSkillHandler,
  DeleteTeamHandler,
  AddPositionHandler,
];
