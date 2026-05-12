import {navigate} from "react-router-dom";

const ProtectRoute = ({children}) =>{
    const token = localStorage.getItem("token");
    if(!token){
        return <navigate to ="/login" />
    }
    return children;
}

export default ProtectRoute;