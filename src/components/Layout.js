import React from 'react'
import { Outlet} from "react-router-dom"
import Footer from './Footer'

const Layout = () => {
  return (
    <div className="App">
        <Outlet/>
        <Footer/>    
    </div>
  )
}

export default Layout