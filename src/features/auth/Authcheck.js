import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../../features/auth/authSlice"
import { Outlet,useNavigate } from 'react-router-dom'

const Authcheck = () => {
    const navigate = useNavigate();
    const token = useSelector(selectCurrentToken)
    useEffect(()=>{
        if(!token){navigate("/login")}
    },[])
    
  return <Outlet/>
}

export default Authcheck