import { useNavigate } from "react-router-dom";

const ProtectRoute = ({children}) =>{
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    if(!token){
        return <navigate to ="/login" />
    }
    return children;
}

export default ProtectRoute;