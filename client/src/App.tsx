import { useEffect, useState } from "react"

const URL = 'http://localhost:4000';

function App() {
  const [selectedList, setSelectedList] = useState('')
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await fetch(`${URL}/${selectedList}`);
    const data = await response.json();
    console.log(data)
    setData(data);
  };

  useEffect(() => {
    if (selectedList === '') {
      setData([])
      return
    }
    getData()
    
  }, [selectedList])

  return (
    <div>
      <h3>Star Wars API</h3>
      <select value={selectedList} onChange={e => setSelectedList(e.target.value)}>
        <option value="">Please Select a List</option>
        <option value="people">People</option>
        <option value="planets">Planets</option>
      </select>

      <Table data={data} />
    </div>
  )
}

function Table({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th># of Films</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item: { url: any; name: any; films: any; }) => (
          <tr key={item.url}>
            <td>{item.name}</td>
            <td>{item.films.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App