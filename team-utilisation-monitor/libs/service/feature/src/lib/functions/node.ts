export class MainNode{

    public id:number;
    public hours:number;

    public constructor(f_id:number){
        this.id=f_id;
        this.hours=0;
    }

    setHours(f_hours:number){
        this.hours=f_hours;
    }
}