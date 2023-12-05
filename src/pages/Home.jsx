import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import titleImage from '../Assets/Screenshot 2023-10-27 103637.png'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { homeprojectAPI } from '../Services/allAPI'

function Home() {
  const[loggedin,setLoggedin] = useState(false)
  const[homeProjects,setHomeProjects] = useState([])

  const getHomeProjects = async()=>{
    const result = await homeprojectAPI()
    if(result.status===200){
      setHomeProjects(result.data)
    }else{
      console.log(result);
      console.log(result.response.data);
    }
  }
 // console.log(homeProjects);
  useEffect(()=>{
     if(sessionStorage.getItem("token")){
        setLoggedin(true)
     }else{
      setLoggedin(false)
     }
     //apicallhomeprojects
     getHomeProjects()

  },[])

  
  return (
    <>
      <div style={{width:'100%',height:'100vh', backgroundColor:'#008fb3'}} className='container-fluid-rounded text-white'>
        <Row className='align-items-center p-5'>
          <Col sm={12} md={6}>
            <p style={{fontSize:'80px'}} className='fw-bolder text-white mb-5'>
            <i className="fa-brands fa-stack-overflow fa-fade"></i>  Project Fair
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio dolore voluptatibus, tempore sequi odio corporis eos ea aspernatur error veritatis, unde sed nam, fugit blanditiis ratione velit repudiandae maiores dicta.
            </p>
          { loggedin?
           <Link to={'/dashboard'} className='btn btn-warning'> manage your projects <i className="fa-solid fa-right-long fa-fade ms-2"></i></Link>:
            <Link to={'/login'} className='btn btn-warning'>Start To Explore <i className="fa-solid fa-right-long fa-fade ms-2"></i></Link>
          }
          </Col>
          <Col sm={12} md={6}>
            <img style={{marginTop:'80px'}} className='w-80' src={titleImage} alt=''/>
          </Col>

        </Row>

      </div>
      {/* all project */}

      <div className='all-projects mt-5'>
        <p style={{fontSize:'50px'}} className='text-center mb-5'>Explore Our Projects</p>
        <marquee scrollAmount={23}>
          <div className='d-flex justify-content-between'>
            {homeProjects?.length>0?homeProjects.map(project=>(
              <div style={{width:'500px'}} className='me-5'>
              <ProjectCard project={project} />
            </div>
            )): null
              
            }
           
          </div>
          
          
        </marquee>
        <div className='text-center mt-5 mb-5'>
            <Link to={'/projects'}>View More Projects</Link>
          </div>
        
      </div>

    </>
  )
}

export default Home