import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState('hi');

  useEffect((): void => {
    async function fetchData(): Promise<void> {
      const apiData = await (
        await fetch(`/api/movies/ownWatchlist/${1}`)
      ).json();
      console.log(apiData);
      setData(apiData);
    }
    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-3x font-bold to-blue-300 bg-gradient-to-tr">
        Hello world!
      </h1>
      <div className="text">{data}</div>
    </>
  );
}

export default App;
