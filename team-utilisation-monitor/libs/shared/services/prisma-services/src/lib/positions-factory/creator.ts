import { PositionEntity } from "@team-utilisation-monitor/api/shared/data-access";

export class Creator{

    position: PositionEntity;

    constructor(){
        this.position.position="NOOB";
    }

    //implementation is at the concrete creator
    create(position_name:string):PositionEntity{
        return this.position;
    }

}