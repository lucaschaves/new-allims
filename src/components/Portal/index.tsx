import { ReactNode, useState } from "react";
import { createPortal } from "react-dom";

interface IPortalProps {
    children: ReactNode;
}

export const Portal = ({ children }: IPortalProps) => {
    const [mountNode, setMountNode] = useState(document.body);
    return createPortal(children, mountNode);
};
