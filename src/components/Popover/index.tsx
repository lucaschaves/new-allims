import { joinClassName } from "@/utils";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { Portal } from "..";

const debounce = (func: any, wait = 100, immediate = false) => {
    let timeout: any;
    return function () {
        const context = this;
        const args = arguments;
        let later = function () {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
};

const ownerDocument = (node: HTMLElement) => {
    return node?.ownerDocument || document;
};

const getOffsetTop = (rect: DOMRect, vertical: string) => {
    if (vertical === "bottom") {
        return rect.height;
    }

    if (vertical === "center") {
        return rect.height / 2;
    }

    //top
    return 0;
};

const getOffsetLeft = (rect: DOMRect, horizontal: string) => {
    if (horizontal === "right") {
        return rect.width;
    }
    if (horizontal === "center") {
        return rect.width / 2;
    }
    //left
    return 0;
};

const resolveAnchorEl = (anchorEl: HTMLElement) =>
    (anchorEl?.nodeType === 1 && anchorEl) || ownerDocument(anchorEl).body;

interface IPopoverProps {
    isOpen: boolean;
    anchorEl: any;
    children: ReactNode;
    marginThreshold?: number;
    anchorOrigin?: { vertical: "bottom" | "top"; horizontal: "left" | "right" };
    onClose?: () => void;
}

export const Popover = ({
    isOpen = true,
    onClose,
    anchorEl,
    anchorOrigin = { vertical: "bottom", horizontal: "left" },
    marginThreshold = 16,
    children,
}: IPopoverProps) => {
    const [contentEl, setContentEl] = useState<HTMLElement>();

    const onCloseHandler = (e: any) => {
        e.stopPropagation();

        if (e.target !== e.currentTarget) {
            return;
        }

        if (onClose) {
            onClose();
        }
    };

    const contentRef = useCallback((node: any) => {
        if (node) {
            setContentEl(node);
        }
    }, []);

    const getAnchorOffset = useCallback(() => {
        const anchorElement = resolveAnchorEl(anchorEl);
        const anchorRect = anchorElement.getBoundingClientRect();

        return {
            top:
                anchorRect.top +
                getOffsetTop(anchorRect, anchorOrigin.vertical),
            left:
                anchorRect.left +
                getOffsetLeft(anchorRect, anchorOrigin.horizontal),
        };
    }, [anchorEl, contentEl, anchorOrigin]);

    const getPositioningStyle = useCallback(() => {
        if (contentEl) {
            const anchorOffset = getAnchorOffset();

            let top = anchorOffset.top;
            let left = anchorOffset.left;
            const bottom = top + contentEl.offsetHeight;
            const right = left + contentEl.offsetWidth;

            const heightThreshold = window.innerHeight - marginThreshold;
            const widthThreshold = window.innerWidth - marginThreshold;

            if (bottom > heightThreshold) {
                const diff = bottom - heightThreshold;
                top = top - diff;
            }

            if (right > widthThreshold) {
                const diff = right - widthThreshold;
                left = left - diff;
            }

            return {
                top: `${Math.round(top)}px`,
                left: `${Math.round(left)}px`,
            };
        }

        return {
            top: `0px`,
            left: `0px`,
        };
    }, [getAnchorOffset, contentEl]);

    const setPositionStyles = useCallback(() => {
        if (!contentEl) {
            return;
        }
        const styles = getPositioningStyle();
        contentEl.style.top = styles.top;
        contentEl.style.left = styles.left;
    }, [contentEl, getPositioningStyle]);

    useEffect(() => {
        setPositionStyles();
        const onResize = debounce(() => {
            setPositionStyles();
        });
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, [setPositionStyles]);

    return (
        <Portal>
            {(isOpen && (
                <div
                    onClick={onCloseHandler}
                    className={joinClassName(
                        "w-full",
                        "fixed",
                        "top-0",
                        "left-0",
                        "bottom-0",
                        "right-0",
                        "bg-red-600"
                    )}
                >
                    <div
                        ref={contentRef}
                        className={joinClassName(
                            "bg-white",
                            "min-w-fit",
                            "border",
                            "rounded-sm",
                            "shadow-xl",
                            "absolute"
                        )}
                    >
                        {children}
                    </div>
                </div>
            )) ||
                null}
        </Portal>
    );
};
