import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import MyProfile from '../components/MyProfile'
import MyProject from '../components/MyProject'

function Dashboard() {
  const[username,setUsername] = useState("")
  useEffect(()=>{
   if(sessionStorage.getItem("existingUser")){
     setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username)
   }
  },[])
  return (
    <div>
      <Header insideDashboard/>
      <Row className='container-fluid mb-4' style={{marginTop:'100px'}}>
      <Col sm={12} md={8}>
        {/* my project */}
        
          <p style={{fontSize:'30px'}}> welcome <span className='text-warning'> {username}</span></p>
        <MyProject/>
      </Col>
      <Col sm={12} md={4}>
       {/* my profile */}
       <MyProfile/>
      </Col>
      </Row>
      
    </div>
  )
}

export default Dashboard