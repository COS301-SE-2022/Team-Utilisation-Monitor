import { Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';
import { DataAccessRepository } from '@team-utilisation-monitor/repository/data-access';
import { PrismaService } from '@team-utilisation-monitor/shared/services/prisma-services';
import { Tree } from './Tree';

@Injectable()
export class FunctionsService {

    constructor(private readonly repository:DataAccessRepository,private readonly prisma:PrismaService){}
    
    async Tree(team_name:string):Promise<string>
    {
        const tree=new Tree(this.repository,"The Car show",this.prisma);
        
        tree.build(); 

        return "Successful Build!";
    }

    
}
