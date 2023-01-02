import { render, screen } from '@testing-library/react';
import { Outage, OutageTypes } from '../model/Outage'
import OutageRow from './OutageRow';

test('renders outage table', () => {
    const outage: Outage = {id:"abc", type: OutageTypes.Incident, startDate: new Date(2022, 11, 27, 21, 52, 26), endDate: new Date(2022, 11, 28, 23, 52, 26)};
    
    render(<table><tbody><OutageRow outage={outage}/></tbody></table>)

    const outageTypeLabel = screen.getByText(/Incident/);
    const idLabel = screen.getByText(`${outage.id}`);
    const startDateLabel = screen.getByText((content, element) => content.includes('27/12/2022'));
    const endDateLabel = screen.getByText((content, element) => content.includes('28/12/2022'));    
    expect(idLabel).toBeInTheDocument();
    expect(outageTypeLabel).toBeInTheDocument();    
    expect(startDateLabel).toBeInTheDocument();
    expect(endDateLabel).toBeInTheDocument();
});