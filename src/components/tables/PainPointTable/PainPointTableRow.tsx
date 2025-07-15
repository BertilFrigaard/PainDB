import { PainPoint } from "@/types/PainPoint";
import { redirect } from "next/navigation";

export default function PainPointTableRow({ row, index }: { row: PainPoint; index: number }) {
    return (
        <tr
            onClick={() => {
                redirect("/db-viewer/" + row.id);
            }}
            className={(index % 2 === 0 ? "bg-white" : "bg-gray-50") + " cursor-pointer hover:bg-gray-100"}
        >
            <td className="px-4 py-3 border-b border-gray-200">{row.problem}</td>
            <td className="px-4 py-3 border-b border-gray-200">{new Date(row.created).toLocaleString()}</td>
            <td className="px-4 py-3 border-b border-gray-200">
                {row.validation ? row.validation : <span className="italic text-gray-500">Waiting</span>}
            </td>
        </tr>
    );
}
