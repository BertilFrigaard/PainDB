import { PainPoint } from "@/types/PainPoint";

export default function TestTable({ painPoints }: { painPoints: PainPoint[] }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 shadow-sm rounded-lg overflow-hidden">
                <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                    <tr>
                        <th className="px-4 py-3 border-b border-gray-300">Problem</th>
                        <th className="px-4 py-3 border-b border-gray-300">Created</th>
                        <th className="px-4 py-3 border-b border-gray-300">Validation</th>
                    </tr>
                </thead>
                <tbody className="text-sm text-gray-800">
                    {painPoints.map((row, index) => (
                        <tr
                            key={index}
                            className={
                                (index % 2 === 0 ? "bg-white" : "bg-gray-50") + " cursor-pointer hover:bg-gray-100"
                            }
                        >
                            <td className="px-4 py-3 border-b border-gray-200">{row.problem}</td>
                            <td className="px-4 py-3 border-b border-gray-200">
                                {new Date(row.created).toLocaleString()}
                            </td>
                            <td className="px-4 py-3 border-b border-gray-200">
                                {row.validation ? (
                                    row.validation
                                ) : (
                                    <span className="italic text-gray-500">Waiting</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
