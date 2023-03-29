import { useEffect, useState } from "react"

const URL = 'http://localhost:4000';

function App() {
  const [selectedList, setSelectedList] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null)

  const getData = async () => {
    const url = `${URL}/${selectedList}${sortBy && selectedList == 'people' ? `?sortBy=${sortBy}` : ''}`
    console.log(url)
    const response = await fetch(url);
    const data = await response.json();
    setData(data);
  };

  function selectRow(item) {
    console.log(item)
    setSelectedItem(item)
  }

  useEffect(() => {
    setSelectedItem(null)
    if (selectedList === '') {
      setData([])
      return
    }
    getData()
    
  }, [selectedList, sortBy])

  return (
    <div>
      <h3>Star Wars API</h3>
      <select value={selectedList} onChange={e => setSelectedList(e.target.value)}>
        <option value="">Please Select a List</option>
        <option value="people">People</option>
        <option value="planets">Planets</option>
      </select>
      {/* if selectedList is people */}
      {selectedList === 'people' && (
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="height">Height</option>
          <option value="mass">Mass</option>
        </select>
      )}


      <Table data={data} selectRow={selectRow}/>
      {selectedItem && <SelectedItem data={selectedItem} type={selectedList} />}
    </div>
  )
}

function Table({ data, selectRow }) {
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
          <tr key={item.url} onClick={(e) => selectRow(item)}>
            <td>{item.name}</td>
            <td>{item.films.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SelectedItem({ data, type }) {
  let info = null
  if (type === 'people') {
    info = (
      <div>
        <p>Name: {data.name}</p>
        <p>Height: {data.height}</p>
        <p>Mass: {data.mass}</p>
        <p>Birth Year: {data.birth_year}</p>
        <p>Eye Color: {data.eye_color}</p>
      </div>
    )
  } else if (type === 'planets') {
    info = (
      <div>
        <p>Name: {data.name}</p>
        <p>Climate: {data.climate}</p>
        <p>Terrain: {data.terrain}</p>
        <p>Population: {data.population}</p>
        <p>Diameter: {data.diamter}</p>
      </div>
    )
  }
  return info
}

export default App