import React, { useEffect } from 'react'
import useAuth from "../../hooks/useAuth"
import { Outlet,useNavigate } from 'react-router-dom'

const Authcheck = () => {
    const navigate = useNavigate();
    const {_id} = useAuth()
    useEffect(()=>{
      if(!_id){navigate("/login")}
    },[])
    
  return <Outlet/>
}

export default Authcheck