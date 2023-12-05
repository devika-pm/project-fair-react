import React, { useContext } from 'react'
import { Navbar,Container, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthorContext } from '../Context/AuthToken'

function Header({insideDashboard}) {
  const {isAuthorised,setIsAuthorised} =useContext(tokenAuthorContext)
  const navigate = useNavigate()
  const handleLogout = ()=>{
    //remove all existing user
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    setIsAuthorised(false)
    //navigate to landing page
    navigate('/')
  }
  return (
    
        <Navbar  className="bg-primary">
        <Container>
          <Navbar.Brand  style={{fontSize:'30px'}}>
          <Link to={'/'} style={{textDecoration:'none',color:'white'}} className='fw-bolder fs-4'><i className="fa-brands fa-stack-overflow fa-fade"></i>Project Fair</Link>
          </Navbar.Brand>

         {insideDashboard && <Button className=' fw-bolder text-danger  ' onClick={handleLogout}>
            LOGOUT
          </Button>}

        </Container>
      </Navbar>
    
  )
}

export default Header