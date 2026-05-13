import React,{useState}from "react";
import axios from "axios";
import { api } from "../services/api";

const Login = ()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
     const [error, setError] = useState("");
     const [success, setSuccess]= useState("");
}
const handleSubmit = async(e)=>{
    e.preventDefault();
    setError("");
    setSuccess("");
    try{
        const response = await api.post('/login', { email, password });
      
        const users = response.data;
        const user = users.find(user =>user.email===email && user.password ===password);
        if(user){
         setSuccess('welcome to the invoiceApp');
    }else{
       setError('please try again ');
    }
}catch(err){
       setError('An error occurred while trying to log in. Please try again later.');
    
}
 return (
    <div>
        <link to="/Dashboard" />
    </div>
 )

}

export default Login;
