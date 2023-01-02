import { useEffect, useState } from 'react';
import './App.css';
import OutageList from './components/OutageList';
import Outage, { GetOutagesResult, OutageTypes } from './model/Outage';
import createMockServer from './mock';

createMockServer();


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
        const response = result.outages as Outage[];    
        setItems(response);
      },
        (error) => {
          setIsLoaded(true);
          setError(error);
        });
  };  
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
