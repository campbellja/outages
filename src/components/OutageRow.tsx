import { FC, useState } from "react";
import Outage, { OutageTypes } from "../model/Outage";
import Moment from "moment";

const OutageRow = ({outage}: {outage: Outage}) => {
    const [type, setType] = useState(outage.type);


    const getOutageTypeDescription = (type: OutageTypes) => {
        switch (type) {
            case OutageTypes.FalseAlarm: return "False Alarm";
            case OutageTypes.PlannedOutage: return "Planned Outage";
        }
        return "Incident";
    };

    const changeOutageType = (outageType: OutageTypes) => {
        setType(outageType);
        // ${outage.id} (${outage.startDate} to ${outage.endDate}) from ${getOutageTypeDescription(outage.type)} 
        console.log(`Update Outage to ${getOutageTypeDescription(outageType)}: ${JSON.stringify(outage)}`);
        const id = outage.id;
        fetch(`api/outages/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                id: id,
                type: outageType
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        })
        .then(response => response.json())
        .then(json=>console.info('PATCH response', json))
    };

    const falseAlarmCheckClicked = (e: any) => {
        e.stopPropagation();
        if (e.target.checked) {
            changeOutageType(OutageTypes.FalseAlarm);
        }
    };

    const incidentCheckClicked = (e: any) => {
        e.stopPropagation();
        if (e.target.checked) {
            changeOutageType(OutageTypes.Incident);
        }
    };

    const plannedOutageCheckClicked = (e: any) => {
        e.stopPropagation();
        if (e.target.checked) {
            changeOutageType(OutageTypes.PlannedOutage);
        }
    };

    const className = (type: OutageTypes) => {
        switch (type) {
            case OutageTypes.FalseAlarm: return "false-alarm";
            case OutageTypes.PlannedOutage: return "planned-outage";
        }
        return "incident";
    };

    const duration = Moment.duration(Moment(outage.endDate).diff(outage.startDate));

    return <tr className={className(type)}>
        <td className="icon"><span></span></td>
        {/* <td><span>{outage.id}</span></td> */}
        <td><input type="radio" value="false" checked={type === OutageTypes.PlannedOutage} onChange={plannedOutageCheckClicked} /></td>
        <td><input type="radio" value="false" checked={type === OutageTypes.Incident} onChange={incidentCheckClicked} /></td>
        <td><input type="radio" value="false" checked={type === OutageTypes.FalseAlarm} onChange={falseAlarmCheckClicked} /></td>
        <td><span>{getOutageTypeDescription(type)}</span></td>
        <td><DateTimeField date={outage.startDate} /></td>
        <td><DateTimeField date={outage.endDate} /></td>
        <td>{duration.asMinutes()}</td>        
    </tr>;
};


export type DateTimeFieldValue = {
    date: Date;
}

const DateTimeField: FC<DateTimeFieldValue> = ({ date }) => {
    return <>{date} @ {date}</>;
};
//  => <span>{date.toLocaleDateString()} @ {date.toLocaleTimeString()}</span>;

export default OutageRow;