import { Search } from "lucide-react"
import Button from "../ui/Button"


const TopBar = ({ title, btn_name }) => {
  return (
    <div className="mb-5">
      <h1 className="title mb-5">{title}</h1>

      <div className="flex items-center justify-between mb-5">
        <div className="search">
            <Search className="search-icon" />
            <input type="text" placeholder="Search..." className="input input-bordered w-full max-w-xs outline-0" />
        </div>

        <Button name={btn_name} />
      </div>
    </div>
  )
}

export default TopBar
