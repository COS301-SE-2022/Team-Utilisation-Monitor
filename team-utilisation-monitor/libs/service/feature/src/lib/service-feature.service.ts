import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { UserPerson } from '@team-utilisation-monitor/api/shared/data-access';
import { GetAllPersonsQuery } from './queries/impl/get-all-persons.query';
import { GetOnePersonQuery } from './queries/impl/get-one-person.query';
import { Login } from './queries/impl/login.query';

@Injectable()
export class ServiceFeatureService {

    constructor(private readonly queryBus:QueryBus){}

    async getAllUserPerson():Promise<UserPerson>
    {
        return this.queryBus.execute(new GetAllPersonsQuery);
    }

    async getOnePersonVEmailService(email:string):Promise<UserPerson|null>
    {
        return this.queryBus.execute(new GetOnePersonQuery(email));
    }

    async login(email:string, password:string):Promise<UserPerson>
    {
        return this.queryBus.execute(new Login(email,password));
    }

    async signup(userPerson:UserPerson)
    {

        return "sign-up";
    }

    
}
