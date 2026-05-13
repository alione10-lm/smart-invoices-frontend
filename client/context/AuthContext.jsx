const login = async(data)=>{
    localStorage.setItem("token", data.token);
}

const logout = ()=>{
    localStorage.removeItem("token");
}
