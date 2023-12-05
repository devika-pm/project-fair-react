import React, { useContext, useEffect, useState } from 'react'
import AddProjects from './AddProjects'
import { deleteProjectAPI, userProjectAPI } from '../Services/allAPI'
import { toast,ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { AddProjectResponseContext, editProjectResponseContext } from '../Context/ContextShare';
import EditProject from './EditProject';

function MyProject({project}) {
  const{editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)
  const {addProjectResponse,setAddProjectResponse }= useContext(AddProjectResponseContext)

  const[userProjects,setUserProjects] = useState([])

  const getUserProjects = async()=>{
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type":"application/json",
    "Authorization":`Bearer ${token}`
      }
      const result = await userProjectAPI(reqHeader)
      if(result.status===200){
        setUserProjects(result.data)
      }else{
        console.log(result);
        toast.warning(result.response.data)
      }
    }
  }
const handleDelete = async(id)=>{
  const token = sessionStorage.getItem("token")
  const reqHeader = {
    "Content-Type":"application/json",
"Authorization":`Bearer ${token}`
  }
  const result = await deleteProjectAPI(id,reqHeader)
  if(result.status===200){
    //page reload
    getUserProjects()
  }else{
    toast.error(result.response.data)
  }
}

  useEffect(()=>{
    getUserProjects()
  },[addProjectResponse,editProjectResponse])
 // console.log(userProjects);
  return (
    <div className='border rounded shadow mt-3 p-3'>
       <div className='d-flex'>
         <p>my projects</p>
         <div className='ms-auto'><AddProjects/></div>
         
        </div>
        {
          addProjectResponse.title ? <alert dismissible><span>{addProjectResponse.title}</span> added successfully</alert> : null
        }
        <div className='mt-4'>
            {/* collection of user projects */}
            {userProjects?.length>0?userProjects.map(project=>(
              <div className='border d-flex align-items-center rounded p-2 mb-3'>
              <p>{project.title}</p>
              <div className='icon ms-auto'>
                
                  <EditProject project={project}/>
                  <a href={`${project.github}`} target='_blank' className='btn'><i className="fa-brands fa-github fa-2x"></i></a>
                  <button onClick={()=>handleDelete(project._id)} className='btn'><i className="fa-solid fa-trash fa-2x"></i></button>

              </div>

          </div>
            ))
              :
            <p className='text-danger fw-bolder fs-5' >No Projects Upload Yet !!!</p>}

        </div>
        <ToastContainer
      position='top-center'
      theme='colored'
      autoClose={2000}/>

    </div>
  )
}

export default MyProject