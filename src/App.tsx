import { useEffect, useState } from 'react';
import './App.css';
import OutageList from './components/OutageList';
import Outage, { OutageTypes } from './model/Outage';
import createMockServer from './mock';

createMockServer();

const initDate = new Date('2022-12-27T09:52:26.721Z');
const buildOutages = (): Outage[] => Array.from(Array(50).keys()).map(i => {
  const id = i.toString();
  const startDate = new Date(initDate);
  startDate.setHours(startDate.getHours() + i);
  const endDate = new Date(startDate);
  endDate.setHours(startDate.getHours() + 1);
  return { id: id, type: OutageTypes.Incident, startDate: startDate, endDate: endDate };
});


const fetchMockOutages = (): Outage[] => buildOutages();
const fetchOutages = () => fetch(outagesEndpoint).then(res => {
  console.debug("Raw response", res);
  return res;
}).then(res => res.json());
const outagesEndpoint = "api/outages";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const emptyArray: Outage[] = [];
  const [items, setItems] = useState(emptyArray);

  const loadOutages = () => {
    fetchOutages()
      .then((result) => {
        setIsLoaded(true);
        const outages = result.outages;
        setItems(outages);
      },
        (error) => {
          setIsLoaded(true);
          setError(error);
        });
  };
  console.info('using outages list', items);
  useEffect(() => {

    let loaded = false;
    if (!loaded) {
      // console.info("fetching outages.");
      // const outages = fetchMockOutages();
      // console.info(`fetched ${outages.length} outages.`);
      loadOutages();
    }
    return () => {
      console.info("unmounting.");
      loaded = true;
    };
  }, []);

  const renderError = (e: Error) => <div><h3>Error</h3><span>{e.message}</span></div>;
  const renderOutages = (outages: Outage[]) => <OutageList outages={items} />;
  const whenRefreshClicked = () => {
    console.log('Refreshing...');
    loadOutages();
  };

  const outages = items;
  return (
    <>
      <input type="button" onClick={whenRefreshClicked} value="Refresh" ></input>
      {!isLoaded ? (<div>Loading...</div>) : (<></>)}
      {error ? (renderError(error)) : (<></>)}
      {isLoaded ? renderOutages(outages) : (<></>)}
    </>
  );

}



export default App;
