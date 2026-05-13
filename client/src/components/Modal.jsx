import { createPortal } from "react-dom";

const Modal = ({ children }) => {
    return createPortal(
        <div className="w-full h-screen fixed inset-0 bg-background/10 backdrop-blur-xs flex items-center justify-center">
            {children}
        </div>,
        document.querySelector("body"),
    );
};

export default Modal;
