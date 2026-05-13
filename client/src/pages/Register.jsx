import React ,{useState} from "react";
import axios from 'axios'

const register = ()=>{
    const [name , setName]= useState("")
    const [email , setEmail]= useState("")
    const [password , setPassword]=useState("")

    const handleChange = (e)=>{
      setName=(e.target.value)
      setEmail=(e.target.value)
      setPassword=(e.target.value)

    }
    return (
        <div>
            <span
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: '#0F1419',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 40 40">
            <path d="M9 20.5L31 9L24.4 31L19.5 22.8L9 20.5Z" fill="var(--ip-brand)" />
            <path d="M19.5 22.8L31 9L22.6 25.2L19.5 22.8Z" fill="var(--ip-brand-hover)" />
          </svg>invoiceApp
        </span>
            <h1>Register</h1> 
            <h2>start atracking invoices in less than a minute</h2> 
             <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Enter name"
            required
            onChange={handleChange}
          ></input>
          <label htmlFor="name">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Enter an email"
            required
            onChange={handleChange}
          ></input> 
           <label htmlFor="name">password</label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Enter your password"
            required
            onChange={handleChange}
          ></input> 
            </div>
        )
}
export default register;