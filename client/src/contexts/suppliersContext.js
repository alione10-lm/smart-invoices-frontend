import { createContext } from "react";

export const ModalContext = createContext(false);
export const SupplierCreateContext = createContext(null)

// const supplierProvider = ({ children }) => {
//     const [isModalOpen, setIsModalOpen] = createContext(false)
    

//     return (
//         <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
//             {children}
//         </ModalContext.Provider>
//     )
// }



// export default supplierProvider;