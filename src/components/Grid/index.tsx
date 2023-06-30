import { joinClassName } from "@/utils";
import { useEffect, useRef, useState } from "react";
import "./styles.css";

interface IColumn {
    field: string;
    fieldName: string;
}

interface IRow {
    [key: string]: any;
}

interface IGridProps {
    columns: IColumn[];
    rows: IRow[];
    loading?: boolean;
}

interface IFocusRow {
    row: IRow;
    cellId: string;
    cell: any;
    indRow: number;
    indCol: number;
}

export function Grid({ columns, rows, loading }: IGridProps) {
    const refGrid = useRef<HTMLDivElement>(null);

    const [focusRow, setFocusRow] = useState<IFocusRow>({} as IFocusRow);

    const getTemplate = () => {
        let templateCols = "grid-cols-[";
        columns.forEach((_, i) => {
            if (i === 0) {
                templateCols += "150px";
            } else if (i === 2) {
                templateCols += "_250px";
            } else {
                templateCols += "_minmax(50px,_1fr)";
            }
            // 100px_minmax(50px,_1fr)_100px
            // grid-cols-[150px_minmax(50px,_1fr)_250px_minmax(50px,_1fr)]
        });
        templateCols += "]";
        // refGrid.current?.classList.add(templateCols);
    };

    const handleClick = (propsClick: IFocusRow) => {
        setFocusRow(propsClick);
        // const elementsRowFocus = document.querySelectorAll(
        //     "[data-front-focus-row]"
        // );

        // elementsRowFocus.forEach((element) => {
        //     element.classList.replace("bg-blue-200", "bg-white");
        // });
        // const elementsRowId = document.querySelectorAll(
        //     `[data-front-row-id="${propsClick.indRow}"]`
        // );

        // elementsRowId.forEach((element) => {
        //     element.classList.replace("bg-white", "bg-blue-200");
        //     element.setAttribute("data-front-focus-row", "true");
        // });
    };

    useEffect(() => {
        getTemplate();
    }, []);

    return (
        <div
            className={joinClassName(
                "rounded",
                "h-full",
                "w-full",
                "overflow-hidden",
                "p-2",
                "bg-white",
                "text-base"
            )}
        >
            <div className={joinClassName("h-full", "w-full", "overflow-auto")}>
                <div
                    className={joinClassName(
                        "grid",
                        "gap-x-0.5",
                        "grid-flow-row",
                        "grid-cols-[200px_minmax(250px,_1fr)_minmax(250px,_1fr)_minmax(250px,_1fr)_minmax(350px,_1fr)_minmax(350px,_1fr)_minmax(250px,_1fr)_minmax(250px,_1fr)_minmax(250px,_1fr)_minmax(250px,_1fr)_minmax(250px,_1fr)_minmax(250px,_1fr)]",
                        "relative"
                    )}
                    ref={refGrid}
                >
                    {columns.map((col, ind) => (
                        <div
                            key={col.field}
                            className={joinClassName(
                                "bg-slate-100",
                                "px-1",
                                "py-2",
                                "sticky",
                                "top-0",
                                "z-10",

                                ind === 0
                                    ? "bg-slate-200 z-20 left-0 drop-shadow-right"
                                    : "",
                                ind === columns.length - 1
                                    ? "bg-slate-200 sticky right-0 drop-shadow-left"
                                    : "",
                                loading ? "animate-pulse" : ""
                            )}
                        >
                            {loading ? (
                                <span className="text-slate-300">...</span>
                            ) : (
                                <span className="text-base">{col.field}</span>
                            )}
                        </div>
                    ))}
                    {rows.map((row, indRow) =>
                        columns.map((col, indCol) => (
                            <div
                                key={`${col.field}${indCol}`}
                                className={joinClassName(
                                    // indRow > 7 ? "px-1 py-3" : "p-1",
                                    "p-3",
                                    "text-base",
                                    focusRow?.indRow === indRow
                                        ? "bg-slate-200"
                                        : indRow % 2
                                        ? "bg-white"
                                        : "bg-slate-50",
                                    `${indRow}-${indCol}` === focusRow?.cellId
                                        ? "shadow-select"
                                        : "",
                                    indCol === 0
                                        ? "sticky left-0 drop-shadow-right"
                                        : "",
                                    indCol === columns.length - 1
                                        ? "sticky right-0 drop-shadow-left"
                                        : "",
                                    "hover:bg-slate-300",
                                    loading ? "animate-pulse" : ""
                                )}
                                onClick={() =>
                                    handleClick({
                                        row,
                                        cell: row[col.fieldName],
                                        indRow,
                                        indCol,
                                        cellId: `${indRow}-${indCol}`,
                                    })
                                }
                                data-front-row-id={indRow}
                                data-front-cell-id={`${indRow}-${indCol}`}
                            >
                                {loading ? (
                                    <span className="text-slate-300">...</span>
                                ) : (
                                    <span className="text-base">
                                        {row[col.fieldName]}
                                    </span>
                                )}
                            </div>
                        ))
                    )}
                    {columns.map((col, ind) => (
                        <div
                            key={col.field}
                            className={joinClassName(
                                "bg-slate-100",
                                "p-1",
                                "sticky",
                                "bottom-0",
                                "z-10",
                                "text-base",
                                ind === 0
                                    ? "bg-slate-200 z-20 left-0 drop-shadow-right"
                                    : "",
                                ind === columns.length - 1
                                    ? "bg-slate-200 sticky right-0 drop-shadow-left"
                                    : "",
                                loading ? "animate-pulse" : ""
                            )}
                        >
                            {loading ? (
                                <span className="text-slate-300">...</span>
                            ) : ind === 0 ? (
                                <span className="text-base">Total: 20</span>
                            ) : (
                                ""
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
