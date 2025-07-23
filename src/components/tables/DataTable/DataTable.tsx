export default function DataTable<T extends object>({ data }: { data: T[] }) {
    const keys = data.length > 0 ? Object.keys(data[0]) : [];
    if (keys.length === 0) {
        return null;
    }
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full overflow-hidden">
                <thead className="text-left text-sm font-semibold">
                    <tr>
                        {keys.map((key, index) => (
                            <th
                                key={index}
                                className="py-3 border-b-2 border-gray-300 text-secondary text-base capitalize"
                            >
                                {key.replace(/_/g, " ")}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="text-sm text-gray-800">
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="cursor-pointer group">
                            {keys.map((key, colIndex) => (
                                <td
                                    key={colIndex}
                                    className="py-5 border-b-2 border-gray-200 transition-colors group-hover:bg-gray-100"
                                >
                                    {String(row[key as keyof T])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
