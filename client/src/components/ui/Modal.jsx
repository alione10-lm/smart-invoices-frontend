import { X } from "lucide-react"
import { ModalContext } from "../../contexts/suppliersContext"
import { useContext } from "react"

const Modal = ({ isOpen, children }) => {
    const { setIsModalOpen } = useContext(ModalContext)

    if(!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/30 flex-center z-50">
        <div className="modal-container relative border border-border rounded-lg p-6 w-96 bg-secondary">
            <div className="modal-content flex items-center justify-between w-full mb-5">
                <h2 className="text-xl font-bold">Modal Title</h2>

                <div className="flex-center p-1 rounded-full bg-muted-foreground hover:bg-destructive/30 transition-all duration-300 text-white" 
                    onClick={() => setIsModalOpen(false)}
                >
                   <X className="cursor-pointer hover:text-destructive transition-all duration-75" size={20}/>
                </div>
            </div>

            {children}
        </div>
    </div>
  )
}

export default Modal
