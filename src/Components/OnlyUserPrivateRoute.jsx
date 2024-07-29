import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'


const OnlyUserPrivateRoute = () => {

    const {currentuser} = useSelector((state)=>state.user)
    return currentuser && currentuser.rest.isUser ? (<Outlet/>):(<Navigate to='/signin'/>)
    
      
    
 
}

// export default OnlyAdminPrivateRoute
export default OnlyUserPrivateRoute