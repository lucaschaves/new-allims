import { ReactNode, useRef } from "react";

interface ITooltipProps {
    children: ReactNode;
    tooltip?: string;
}

export const Tooltip = ({ children, tooltip }: ITooltipProps): JSX.Element => {
    const tooltipRef = useRef<HTMLSpanElement>(null);
    const container = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={container}
            onMouseEnter={({ clientX }) => {
                if (!tooltipRef.current || !container.current) return;
                const { left } = container.current.getBoundingClientRect();

                tooltipRef.current.style.left = clientX - left + "px";
            }}
            className="group relative inline-block"
        >
            {children}
            {tooltip ? (
                <span
                    ref={tooltipRef}
                    className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition bg-blue-500 text-white p-1 rounded absolute -top-7 mt-2 whitespace-nowrap"
                >
                    {tooltip}
                </span>
            ) : null}
        </div>
    );
};

Tooltip.displayName = "Tooltip";
