

export enum OutageTypes{    
    Incident,
    FalseAlarm,
    PlannedOutage
}

export class Outage{
    constructor(id: string,
        type: OutageTypes,
        startDate: Date,
        endDate: Date)
    {
        this.id = id;
        this.type = type;
        this.startDate = startDate;
        this.endDate = endDate;        
    }

    public id: string;
    public type: OutageTypes;
    public startDate: Date;
    public endDate: Date;

}

// const example: IOutage[] = [
//     {id: '12345', type: OutageTypes.Incident, startDate: new Date('2022-12-27T09:52:26.721Z'), endDate: new Date('2022-12-27T09:55:26.721Z')},
//     {id: '56789', type: OutageTypes.PlannedOutage, startDate: new Date('2022-12-26T08:30:00.721Z'), endDate: new Date('2022-12-26T09:30:00.000Z')}
// ];