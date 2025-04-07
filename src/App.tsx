import { useState, useEffect, use } from 'react';
import axios from 'axios';
import { api } from './services/api';

function App() {
  const [data, setData] = useState([]);
  // const [filteredData, setFilteredData] = useState([]);
  const [currentData, setCurrentData] = useState<number>([]);
  const [index, setIndex] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  const changePage = (index: number) => {
    const newCurrentData = data.slice(currentPage, 5);
    const postionInArray = data.findIndex(() => );
    console.log(newCurrentData);
  };

  useEffect(() => {
    const req = api.get('https://jsonplaceholder.typicode.com/users').then((response) => {
      setData(response.data);
      const firstPage = response.data.slice(0, 5);
      setCurrentData(firstPage);
    });
  }, []);

  return (
    <>
      {currentData && currentData.map((user) => (
        <ul key={user.id}>
          {user.name} | {user.email} | 
        </ul>
      ))}
      <button>Proxima</button>
      <button>1</button>
      <button onClick={() => changePage(2)}>2</button>
      <button>Anterior</button>
    </>
  );
};

export default App
