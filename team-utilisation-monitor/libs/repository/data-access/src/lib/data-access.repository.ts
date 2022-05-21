import { Injectable } from '@nestjs/common';
import {UserPerson} from '@team-utilisation-monitor/api/shared/data-access'
import { Prisma, PrismaClient } from '@prisma/client'

@Injectable()
export class DataAccessRepository {

    constructor(private readonly prisma:PrismaClient ){}
    
}
