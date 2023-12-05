import React, { createContext, useEffect, useState } from 'react'
export const tokenAuthorContext = createContext()

function AuthToken({children}) {
    const[isAuthorised,setIsAuthorised] = useState(false)
    useEffect(()=>{
      if(sessionStorage.getItem("token")){
        setIsAuthorised(true)
      }else{
        setIsAuthorised(false)
      }
    },[isAuthorised])
  return (
    <> 
    <tokenAuthorContext.Provider value={{isAuthorised,setIsAuthorised}}>{children}</tokenAuthorContext.Provider>
    </>
  )
}

export default AuthToken