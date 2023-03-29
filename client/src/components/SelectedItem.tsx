import Person from '../types/People.type';
import Planet from '../types/Planets.type';
import Label from './Label';

function SelectedItem({
    data,
    type,
}: {
    data: Person | Planet;
    type: string;
}): JSX.Element {
    let info = <div></div>;
    if (data && data.type === 'person') {
        info = (
            <div className="w-1/2 pl-4">
                <Label label="Name" value={data.name} />
                <Label label="Height" value={data.height} />
                <Label label="Mass" value={data.mass} />
                <Label label="Birth Year" value={data.birth_year} />
                <Label label="Eye Color" value={data.eye_color} />
            </div>
        );
    } else if (data && data.type === 'planet') {
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

export default SelectedItem;
