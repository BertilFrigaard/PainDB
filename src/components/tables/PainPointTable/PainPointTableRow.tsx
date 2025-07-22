import { PainPoint } from "@/types/PainPoint";
import { FaRegStar, FaStar } from "react-icons/fa6";

export default function PainPointTableRow({
    row,
    onClick,
    favoriteClick,
}: {
    row: PainPoint;
    onClick: () => void;
    favoriteClick: () => void;
}) {
    return (
        <tr onClick={onClick} className="cursor-pointer hover:bg-gray-100">
            {row.favorite ? (
                <td
                    onClick={(e) => {
                        favoriteClick();
                        e.stopPropagation();
                    }}
                    className="bg-white pr-2 hover:text-secondary text-favorite"
                >
                    <FaStar className="font-bold text-lg" />
                </td>
            ) : (
                <td
                    onClick={(e) => {
                        favoriteClick();
                        e.stopPropagation();
                    }}
                    className="bg-white pr-2 hover:text-favorite text-secondary"
                >
                    <FaRegStar className="font-bold text-lg" />
                </td>
            )}
            <td className="px-4 py-5 border-b-2 border-gray-200">{row.problem}</td>
            <td className="px-4 py-5 border-b-2 border-gray-200">{new Date(row.created).toLocaleString()}</td>
            <td className="px-4 py-5 border-b-2 border-gray-200">
                {row.validation ? row.validation : <span className="italic text-gray-500">Waiting</span>}
            </td>
        </tr>
    );
}
