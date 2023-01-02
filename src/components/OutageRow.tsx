import '../toggle-radios.css';
import { FC, useState } from "react";
import Outage, { OutageTypes } from "../model/Outage";
import Moment from "moment";

const OutageRow = ({ outage }: { outage: Outage }) => {
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
        .then(json => console.info('PATCH response', json))
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
    const outageTypeFieldName = `outageTypeRadioGroup-${outage.id}`;
    return <tr className={className(type)}>
        <td><span>&nbsp;&nbsp;&nbsp;</span></td>
        {/* <td><span>{outage.id}</span></td> */}
        <td className="icon"><span>{getOutageTypeDescription(type)}</span></td>
        <td>
            <div className="toggle-radio">
                <input id={`${outageTypeFieldName}-plannedOutageType`} name={outageTypeFieldName} type="radio" value="false" checked={type === OutageTypes.PlannedOutage} onChange={plannedOutageCheckClicked} />
                <label htmlFor={`${outageTypeFieldName}-plannedOutageType`}>Planned</label>
                <input id={`${outageTypeFieldName}-incidentOutageType`} name={outageTypeFieldName} type="radio" value="false" checked={type === OutageTypes.Incident} onChange={incidentCheckClicked} />
                <label htmlFor={`${outageTypeFieldName}-incidentOutageType`}>Incident</label>
                <input id={`${outageTypeFieldName}-falseAlarmOutageType`} name={outageTypeFieldName} type="radio" value="false" checked={type === OutageTypes.FalseAlarm} onChange={falseAlarmCheckClicked} />
                <label htmlFor={`${outageTypeFieldName}-falseAlarmOutageType`}>False</label>
            </div>
        </td>
        <td><DateTimeField date={outage.startDate} /></td>
        <td><DateTimeField date={outage.endDate} /></td>
        <td>{duration.asMinutes()}</td>
    </tr>;
};


export type DateTimeFieldValue = {
    date: string;
}

const DateTimeField: FC<DateTimeFieldValue> = ({ date }) => {
    const d = new Date(date);
    return <>{d.toLocaleDateString("en", {
        year: "numeric",
        month: "2-digit",
        day: "numeric"
    })} @ {d.toLocaleTimeString("en")}</>;
};
//  => <span>{date.toLocaleDateString()} @ {date.toLocaleTimeString()}</span>;

export default OutageRow;