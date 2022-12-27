import React, { useState, ChangeEvent } from 'react';
import logo from './logo.svg';
import './App.css';
import OutageList from './OutageList';
import { Outage, OutageTypes } from './Outage';


const initDate = new Date('2022-12-27T09:52:26.721Z');
const buildOutages = () => Array.from(Array(50).keys()).map(i=>{
    const id = i.toString();        
    const startDate = new Date(initDate);
    startDate.setHours(startDate.getHours() + i);
    const endDate  = new Date(startDate);
    endDate.setHours(startDate.getHours() + 1 );
    return {id: id, type: OutageTypes.Incident, startDate: startDate, endDate: endDate};
});


function App() {
  const [flag, setFlag] = useState(false);

  const whenCheckboxChanged = (e:ChangeEvent<HTMLInputElement>)=>{
    const updatedValue = e.target.checked;
    console.log(`Was: ${flag} - setting to ${updatedValue}`);
    setFlag(updatedValue);
  };

  const logoRendering = !flag && <img src={logo} className="App-logo" alt="logo"/>;

  const outages = buildOutages();

  return (
    <>
      <OutageList outages={outages}/>
      <div className="App">
        <header className="App-header">        
            {logoRendering}
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <label htmlFor="hideLogoCheckbox">Hide Logo?</label>
          <input id="hideLogoCheckbox" name="hideLogoCheckbox" type="checkbox" onChange={whenCheckboxChanged}/>
        </header>      
      </div>
    </>
  );
}

export default App;
