type Column = {
    index: string;
    name: string;
    centered?: boolean;
    defaultValue?: string;
    bubble?: boolean;
    bubbleColor?: (value: string) => string;
    textColor?: string;
    button?: boolean;
    buttonClicked?: (row: Data) => void;
};

type Data = Record<string, string | null>;

type DataTableProps = {
    columns: Column[];
    data: Data[];
    rowClick?: (row: Data) => void;
};

export default function DataTable({ columns, data, rowClick }: DataTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full overflow-hidden">
                <thead className="text-left text-sm font-semibold">
                    <tr>
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                className={
                                    "py-3 border-b-2 border-gray-300 text-secondary text-base capitalize " +
                                    (column.centered && "text-center")
                                }
                            >
                                {column.name}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="text-sm text-gray-800">
                    {data.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className={rowClick && "cursor-pointer group"}
                            onClick={() => {
                                if (rowClick) {
                                    rowClick(row);
                                }
                            }}
                        >
                            {columns.map((column, colIndex) => (
                                <td
                                    key={colIndex}
                                    className={
                                        "py-5 border-b-2 border-gray-200 transition-colors group-hover:bg-gray-100 " +
                                        (column.centered && "text-center ")
                                    }
                                >
                                    <div
                                        onClick={() => {
                                            if (column.buttonClicked) {
                                                column.buttonClicked(row);
                                            }
                                        }}
                                        className={
                                            "" +
                                            (column.textColor ? column.textColor : " text-black ") +
                                            (column.bubble &&
                                                "inline-block px-3 py-1 rounded-full text-sm " +
                                                    (column.bubbleColor
                                                        ? column.bubbleColor(
                                                              row[column.index] == undefined ||
                                                                  row[column.index] == null
                                                                  ? column.defaultValue || ""
                                                                  : row[column.index]!
                                                          )
                                                        : "primary") +
                                                    " ") +
                                            (column.button && "cursor-pointer hover:scale-110 px-5 py-2 duration-100")
                                        }
                                    >
                                        {row[column.index] == undefined || row[column.index] == null
                                            ? column.defaultValue || ""
                                            : row[column.index]!}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
