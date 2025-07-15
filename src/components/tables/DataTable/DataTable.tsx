export default function DataTable<T extends object>({ data }: { data: T[] }) {
    const keys = data.length > 0 ? Object.keys(data[0]) : [];
    if (keys.length === 0) {
        return <p>No Data</p>;
    }
    return (
        <table className="border-separate border-spacing-3 border border-gray-400">
            <thead>
                <tr>
                    {keys.map((key, index) => (
                        <td key={index}>{key}</td>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        {keys.map((key, index) => (
                            <td key={index}>{String(row[key as keyof T])}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
