import { PositionEntity } from "@team-utilisation-monitor/api/shared/data-access";
import { Creator } from "./creator";

export class PositionCreator extends Creator{

    create(position_name:string): PositionEntity {
        this.position.position=position_name;

        return this.position;
    }
}