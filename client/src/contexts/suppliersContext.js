import { createContext } from "react";

export const ModalContext = createContext();

// export const ModalProvider = ({ children }) => {
//     const [isModalOpen, setIsModalOpen] = createContext(false)

//     return (
//         <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
//             {children}
//         </ModalContext.Provider>
//     )
// }
