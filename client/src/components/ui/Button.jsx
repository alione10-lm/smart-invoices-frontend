import { Plus } from "lucide-react"
import { useContext } from "react"
import { ModalContext } from "../../contexts/suppliersContext.js"

const Button = ({ name }) => {
    const { setIsModalOpen } = useContext(ModalContext)
  return (
    <button 
        className="button_primary"
        onClick={() => setIsModalOpen(true)}
    >
        <span className="order-2">{name}</span>
        <span className="relative only:-mx-5">
            <Plus className="w-4 h-4" />
        </span>
    </button>

  )
}

export default Button
