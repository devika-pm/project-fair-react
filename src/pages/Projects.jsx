import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Row,Col } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { allprojectAPI } from '../Services/allAPI'

function Projects() {
  const[searchKey,setSearchKey] = useState("")
  const[allProjects,setAllProjects] = useState([])

  const getAllProjects = async()=>{
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type":"application/json",
    "Authorization":`Bearer ${token}`
      }
      const result = await allprojectAPI(searchKey, reqHeader)
      if(result?.status===200){
        setAllProjects(result?.data)
      }else{
        console.log(result);
      }
    }
  }
useEffect(()=>{
  getAllProjects()
},[searchKey])

  return (
    <>
      <Header/>
      <div style={{marginTop:'100px'}} className='projects'>
        <p style={{fontSize:'40px'}}>All Projects</p>
        <div className='d-flex justify-content-center align-items-center w-100 mb-5'>
          <div className=' d-flex border w-50 rounded '>
            <input type='text' className='form-control' placeholder='search by technologies used' onChange={e=>setSearchKey(e.target.value)}/>
            <i style={{marginLeft:'-50px'}} className="fa-solid fa-magnifying-glass fa-rotate-90"></i>
          </div>
        </div>
        <Row className='mt-5 container-fluid'>
          {allProjects?.length>0?allProjects?.map(project=>(
            <Col sm={12} md={6} lg={4}>
            <ProjectCard project={project}/>
          </Col>
          )):<p className='text-danger w-10'>Please Login To See Projects </p>
            
          }
        </Row>
      </div>
    </>
  )
}

export default Projects