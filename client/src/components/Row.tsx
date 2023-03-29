import Person from '../types/People.type';
import Planet from '../types/Planets.type';

function Row({
    item,
    selectRow,
}: {
    item: Person | Planet;
    selectRow: Function;
}): JSX.Element {
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

export default Row;
