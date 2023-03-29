import { useEffect, useState } from 'react';

const URL = 'http://localhost:4000';

function App() {
    const [selectedList, setSelectedList] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [data, setData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    const getData = async () => {
        const url = `${URL}/${selectedList}${
            sortBy && selectedList == 'people' ? `?sortBy=${sortBy}` : ''
        }`;
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
    };

    function selectRow(item) {
        console.log(item);
        setSelectedItem(item);
    }

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    useEffect(() => {
        setSelectedItem(null);
        if (selectedList === '') {
            setData([]);
            return;
        }
        getData();
    }, [selectedList, sortBy]);

    return (
        <div className="container mx-auto mt-12 bg-slate-300 p-8 h-[90vh]">
            <h1 className="text-3xl">Star Wars API</h1>
            <select
                value={selectedList}
                onChange={(e) => setSelectedList(e.target.value)}
                className="mt-4 mr-4"
            >
                <option value="">Please Select a List</option>
                <option value="people">People</option>
                <option value="planets">Planets</option>
            </select>
            {selectedList === 'people' && (
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="">Sort By</option>
                    <option value="name">Name</option>
                    <option value="height">Height</option>
                    <option value="mass">Mass</option>
                </select>
            )}

            <div className="flex flex-row w-full">
                <h2 className="text-2xl pt-4 w-1/2">
                    List / {toTitleCase(selectedList)}
                </h2>
                {selectedItem && (
                    <h2 className="text-2xl pt-4 w-1/2 pl-4">Info</h2>
                )}
            </div>

            <div className="flex flex-row w-full h-5/6 mt-4">
                <Table data={data} selectRow={selectRow} />
                {selectedItem && (
                    <SelectedItem data={selectedItem} type={selectedList} />
                )}
            </div>
        </div>
    );
}

function Table({ data, selectRow }) {
    return (
        <div
            className={`w-1/2 pr-4 h-full ${
                data.length ? 'overflow-y-scroll' : ''
            }`}
        >
            <table className="text-sm text-left w-full">
                <thead className="text-xs text-gray-800 uppercase bg-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            # of Films
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item: { url: any; name: any; films: any }) => (
                        <Row key={item.url} item={item} selectRow={selectRow} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function Row({ item, selectRow }) {
    return (
        <tr
            key={item.url}
            onClick={(e) => selectRow(item)}
            className="bg-white border-b"
        >
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {item.name}
            </td>
            <td>{item.films.length}</td>
        </tr>
    );
}

function SelectedItem({ data, type }) {
    let info = null;
    if (data && type === 'people') {
        info = (
            <div className="w-1/2 pl-4">
                <Label label="Name" value={data.name} />
                <Label label="Height" value={data.height} />
                <Label label="Mass" value={data.mass} />
                <Label label="Birth Year" value={data.birth_year} />
                <Label label="Eye Color" value={data.eye_color} />
            </div>
        );
    } else if (data && type === 'planets') {
        info = (
            <div className="w-1/2 pl-4">
                <Label label="Name" value={data.name} />
                <Label label="Climate" value={data.climate} />
                <Label label="Terrain" value={data.terrain} />
                <Label label="Population" value={data.population} />
                <Label label="Diameter" value={data.diameter} />
            </div>
        );
    }
    return info;
}

function Label({ label, value }) {
    let titleValue = value;

    if (value) {
        titleValue = value.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
    return (
        <div className="mb-4 flex flex-col">
            <span className="text-gray-800">{label}: </span>
            <span className="text-gray-900 bg-white p-2 border-2 border-black">
                {titleValue}
            </span>
        </div>
    );
}

export default App;
