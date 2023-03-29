import Row from './Row';
import Person from '../types/People.type';
import Planet from '../types/Planets.type';

function Table({
    data,
    selectRow,
}: {
    data: Person[] | Planet[];
    selectRow: Function;
}): JSX.Element {
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
                    {data.map((item: Person | Planet) => (
                        <Row key={item.url} item={item} selectRow={selectRow} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
