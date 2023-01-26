import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState('hi');

  useEffect((): void => {
    async function fetchData(): Promise<void> {
      const apiData: string = await (await fetch('/api')).json();
      setData(apiData);
    }
    fetchData();
  }, []);

  return <div className="container">{data}</div>;
}

export default App;
