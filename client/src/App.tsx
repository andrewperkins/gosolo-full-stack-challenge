import { useEffect, useState } from 'react';
import Person from './types/People.type';
import Planet from './types/Planets.type';
import Table from './components/Table';
import SelectedItem from './components/SelectedItem';

// const URL = 'http://localhost:4000';
const URL =
    'https://andrewperkins-glowing-fishstick-pgx9q5v5rjv2r794-4000.preview.app.github.dev';

function App(): JSX.Element {
    const [selectedList, setSelectedList] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [data, setData] = useState<Person[] | Planet[]>([]);
    const [selectedItem, setSelectedItem] = useState<Person | Planet | null>(
        null
    );

    const getData = async (): Promise<void> => {
        const url = `${URL}/${selectedList}${
            sortBy && selectedList == 'people' ? `?sortBy=${sortBy}` : ''
        }`;
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        if (selectedList === 'people') {
            setData(data.map((item: Person) => ({ ...item, type: 'person' })));
        } else if (selectedList === 'planets') {
            setData(data.map((item: Planet) => ({ ...item, type: 'planet' })));
        } else {
            setData([]);
        }
    };

    function selectRow(item: Person | Planet): void {
        setSelectedItem(item);
    }

    function toTitleCase(str: string): string {
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

export default App;
