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

  return (
    <>
      <h1 className="text-2xl font-bold">Hello world!</h1>
      <div className="text-2xl font-bold underline">{data}</div>
    </>
  );
}

export default App;
