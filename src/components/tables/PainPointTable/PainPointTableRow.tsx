import { PainPoint } from "@/types/PainPoint";

export default function PainPointTableRow({ row, onClick }: { row: PainPoint; onClick: () => void }) {
    return (
        <tr onClick={onClick} className={" cursor-pointer hover:bg-gray-100"}>
            <td className="px-4 py-5 border-b-2 border-gray-200">{row.problem}</td>
            <td className="px-4 py-5 border-b-2 border-gray-200">{new Date(row.created).toLocaleString()}</td>
            <td className="px-4 py-5 border-b-2 border-gray-200">
                {row.validation ? row.validation : <span className="italic text-gray-500">Waiting</span>}
            </td>
        </tr>
    );
}
