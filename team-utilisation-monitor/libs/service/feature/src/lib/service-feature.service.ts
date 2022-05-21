import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { UserPerson } from '@team-utilisation-monitor/api/shared/data-access';
import { GetAllPersonsQuery } from './queries/impl/get-all-persons.query';

@Injectable()
export class ServiceFeatureService {

    constructor(private readonly queryBus:QueryBus){}

    async getAllUserPerson():Promise<UserPerson>
    {
        return this.queryBus.execute(new GetAllPersonsQuery);
    }
}
