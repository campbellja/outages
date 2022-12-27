import { FC, useState } from "react";
import Moment from "moment";
import { Outage, OutageTypes } from "./Outage";

export type DateTimeFieldValue = {
    date: Date;
}

const DateTimeField: FC<DateTimeFieldValue> = ({ date }) => <span>{date.toLocaleDateString()} @ {date.toLocaleTimeString()}</span>;

const OutageRow: FC<Outage> = (outage) => {
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
        <td><span>{outage.id}</span></td>
        <td><span>{getOutageTypeDescription(type)}</span></td>
        <td><DateTimeField date={outage.startDate} /></td>
        <td><DateTimeField date={outage.endDate} /></td>
        <td>{duration.asMinutes()}</td>
        <td><input type="checkbox" value="false" checked={type === OutageTypes.PlannedOutage} onChange={plannedOutageCheckClicked} /></td>
        <td><input type="checkbox" value="false" checked={type === OutageTypes.Incident} onChange={incidentCheckClicked} /></td>
        <td><input type="checkbox" value="false" checked={type === OutageTypes.FalseAlarm} onChange={falseAlarmCheckClicked} /></td>
    </tr>;
};

export default function OutageList({ outages }: { outages: Outage[] }) {

    const outageRows = outages.map(o =>
        <OutageRow key={o.id} {...o} />
    );
    return <>
        <div className="outage-list">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Duration (mins)</th>
                        <th>Planned Outage</th>
                        <th>Incident</th>
                        <th>False Alarm</th>
                    </tr>
                </thead>
                <tbody>
                    {outageRows}
                </tbody>
            </table>
        </div>
    </>
};
