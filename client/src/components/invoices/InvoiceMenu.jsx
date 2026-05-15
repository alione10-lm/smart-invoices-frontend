import { EllipsisVertical, Menu } from "lucide-react";
import { useState, useEffect, useRef, cloneElement } from "react";

export default function DropdownIcon(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(0);
    const wrapperRef = useRef(null);

    const navigationItems = [
        {
            linkName: "Dashboard",
            sortDescription: "Quick overview of all basic metrics and settings",
        },
        {
            linkName: "Metrics and analytics",
            sortDescription: "Detailed analytic date reviews management",
        },
        { separator: true },
        {
            linkName: "Multi-Channel Funnels overview",
            sortDescription:
                "Generated from conversion paths, the sequences of interactions",
        },
        {
            linkName: "User settings",
            sortDescription:
                "User settings allow you to configure your email preferences",
        },
        {
            linkName: "User Profile",
            sortDescription:
                "A collection of settings and information about your account",
        },
    ];

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    });

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const handleKeyDown = (e) => {
        if (isOpen) {
            e.preventDefault();

            switch (e.keyCode) {
                // KeyDown
                case 40:
                    if (currentItem === navigationItems.length - 1) {
                        setCurrentItem(0);
                    } else {
                        if (
                            navigationItems[currentItem + 1]?.hasOwnProperty(
                                "separator",
                            )
                        ) {
                            setCurrentItem(currentItem + 2);
                        } else {
                            setCurrentItem(currentItem + 1);
                        }
                    }
                    break;
                // KeyUp
                case 38:
                    if (currentItem === 0) {
                        setCurrentItem(navigationItems.length - 1);
                    } else {
                        if (
                            navigationItems[currentItem - 1]?.hasOwnProperty(
                                "separator",
                            )
                        ) {
                            setCurrentItem(currentItem - 2);
                        } else {
                            setCurrentItem(currentItem - 1);
                        }
                    }
                    break;
                // Escape
                case 27:
                    setCurrentItem(1);
                    setIsOpen(false);
                    break;
                default:
                    break;
            }
        }
    };

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

                <ul
                    className={`${
                        isOpen ? "flex" : "hidden"
                    } absolute  z-30 mt-1 right-3 top-5 list-none bg-background flex-col rounded   p-2 w-40  `}
                >
                    {props.children?.map((item, index) =>
                        cloneElement(item, {
                            key: index,
                            className:
                                "hover:bg-secondary hover:text-primary cursor-pointer flex items-center text-sm gap-2 py-2 px-4 text-start rounded",
                        }),
                    )}
                </ul>
            </div>
        </>
    );
}
