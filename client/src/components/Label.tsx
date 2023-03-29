function Label({
    label,
    value,
}: {
    label: string;
    value: string;
}): JSX.Element {
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

export default Label;
