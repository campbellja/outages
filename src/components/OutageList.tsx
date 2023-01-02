import Outage from "../model/Outage";
import OutageRow from "./OutageRow";

export default function OutageList({ outages }: { outages: Outage[] }) {
    return <>
        <div className="outage-list">
            <table>
                <caption>Outages</caption>
                <thead>
                    <tr>
                        <th></th>
                        {/* <th>ID</th> */}
                        <th></th>
                        <th>Outage Type</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Duration (mins)</th>
                    </tr>
                </thead>
                <tbody>
                    {(outages) ? (outages.map(o => <OutageRow key={o.id} outage={o} />)) : (<tr><td colSpan={8}><span>No Outages found.</span></td></tr>)}
                </tbody>
            </table>
        </div>
    </>;
};