import { PainPoint } from "@/types/PainPoint";
import PainPointTableRow from "./PainPointTableRow";

export default function PainPointTable({ painPoints }: { painPoints: PainPoint[] }) {
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
                        <PainPointTableRow key={index} row={row} index={index} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
