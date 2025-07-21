import { PainPoint } from "@/types/PainPoint";
import PainPointTableRow from "./PainPointTableRow";
import { useState } from "react";
import DetailedView from "@/components/data-views/DetailedView";

export default function PainPointTable({ painPoints }: { painPoints: PainPoint[] }) {
    const [selection, setSelection] = useState<string | null>(null);

    return (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full overflow-hidden">
                    <thead className="text-left text-sm font-semibold">
                        <tr>
                            <th className="px-4 py-3 border-b-2 border-gray-300 text-secondary text-base">Problem</th>
                            <th className="px-4 py-3 border-b-2 border-gray-300 text-secondary text-base">Created</th>
                            <th className="px-4 py-3 border-b-2 border-gray-300 text-secondary text-base">
                                Validation
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-800">
                        {painPoints.map((row, index) => (
                            <PainPointTableRow
                                onClick={() => {
                                    setSelection(row.id);
                                }}
                                key={index}
                                row={row}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            {selection !== null && (
                <DetailedView
                    dataPointID={selection}
                    exitFunc={() => {
                        setSelection(null);
                    }}
                />
            )}
        </>
    );
}
