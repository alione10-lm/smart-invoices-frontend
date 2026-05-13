import { EllipsisVertical, Menu } from "lucide-react";
import { useState, useEffect, useRef, cloneElement } from "react";

export default function DropdownIcon(props) {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target) &&
                !event.target.classList.contains("dropdown-item")
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    return (
        <>
            <div className="relative inline-flex">
                <button
                    className=""
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen ? " true" : "false"}
                    ref={wrapperRef}
                >
                    <EllipsisVertical
                        size={30}
                        className="stroke-primary cursor-pointer hover:bg-background p-2 rounded"
                    />
                </button>

                <div
                    className={`${
                        isOpen ? "flex" : "hidden"
                    } absolute  z-30 mt-1 right-3 top-5 list-none bg-background flex-col rounded   p-2 w-40  `}
                >
                    {props.children.map((item, index) =>
                        cloneElement(item, {
                            key: index,
                            handleDelete: () => {
                                console.log("delete");
                                setIsOpen(false);
                            },

                            handleUpdate: () => {
                                console.log("update");
                                setIsOpen(false);
                            },
                            className:
                                "dropdown-item hover:bg-secondary hover:text-primary cursor-pointer flex items-center text-sm gap-2 py-2 px-4 text-start rounded",
                        }),
                    )}
                </div>
            </div>
        </>
    );
}
