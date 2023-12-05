import React,{useContext, useEffect, useState} from 'react'
import { Modal,Button } from 'react-bootstrap';
import { BASE_URL } from '../Services/baseUrl';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { editProjectAPI } from '../Services/allAPI';
import { editProjectResponseContext } from '../Context/ContextShare';


function EditProject({project}) {
  const {editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)
    const[projectDetails,setProjectDetails] = useState({
        id:project._id,title:project.title,languages:project.languages,overview:project.overview,
        github:project.github,website:project.website, projectImage:""
      })

    const[preview,setPreview] = useState("")
  
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setProjectDetails({id:project._id,title:project.title,languages:project.languages,overview:project.overview,
          github:project.github,website:project.website, projectImage:""})
          setPreview("")
        
       
      }
      const handleShow = () => setShow(true);

      

      useEffect(()=>{
        if(projectDetails.projectImage){
          setPreview(URL.createObjectURL(projectDetails.projectImage))
        }
      },[projectDetails.projectImage])

      const handleUpdate = async()=>{
        const {id,title,languages,overview,github,website,projectImage} = projectDetails
         if(!title || !languages || !overview || !github || !website){
          toast.info("please fill the form completely")
         }else{
          const reqBody = new FormData()
          reqBody.append("title",title)
          reqBody.append("languages",languages)
          reqBody.append("overview",overview)
          reqBody.append("github",github)
         
          reqBody.append("website",website)
           preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)
           const token = sessionStorage.getItem("token")
           if(preview){
            const  reqHeader = {
              "Content-Type":"multipart/form-data",
              "Authorization":`Bearer ${token}`
            }
            //api call
            const result = await editProjectAPI(id,reqBody,reqHeader)
            if(result.status===200){
              handleClose()
              //pass response to my projects
              setEditProjectResponse(result.data)
            }else{
              console.log(result);
              toast.error(result.response.data)
            }
           }else{
            const  reqHeader = {
              "Content-Type":"application/json",
              "Authorization":`Bearer ${token}`
            }
             //api call
             const result = await editProjectAPI(id,reqBody,reqHeader)
             if(result.status===200){
               handleClose()
               //pass response to my projects
               setEditProjectResponse(result.data)
             }else{
               console.log(result);
               toast.error(result.response.data)
             }
            
           }
         }
      }

  return (
    <>

<button className='btn' onClick={handleShow}><i className="fa-solid fa-pen-to-square fa-2x"></i></button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='row'>
                <div className='col-lg-6'>
                    <label>
                        <input type='file' style={{display:'none'}} onChange={e=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})}  />
                        <img  className='img-fluid' src={ preview?preview:`${BASE_URL}/uploads/${project?.projectImage}`} alt='no img'/>
                    </label>
                   
                </div>
                <div className='col-lg-6'>
                    <div className='mb-3'>
                        <input type='text' placeholder='project title' className='form-control' value={projectDetails?.title} onChange={e=>setProjectDetails({...projectDetails,title:e.target.value})}/>
                    </div>
                    <div className='mb-3'>
                        <input type='text' placeholder='Language Used' className='form-control'  value={projectDetails?.languages} onChange={e=>setProjectDetails({...projectDetails,languages:e.target.value})}/>
                    </div>
                    <div className='mb-3'>
                        <input type='text' placeholder='over view' className='form-control'  value={projectDetails?.overview} onChange={e=>setProjectDetails({...projectDetails,overview:e.target.value})}/>
                    </div>
                    <div className='mb-3'>
                        <input type='text' placeholder='git hub' className='form-control'  value={projectDetails?.github} onChange={e=>setProjectDetails({...projectDetails,github:e.target.value})}/>
                    </div>
                    <div className='mb-3'>
                        <input type='text' placeholder='Website Link' className='form-control'  value={projectDetails?.website} onChange={e=>setProjectDetails({...projectDetails,website:e.target.value})}/>
                    </div>

                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            update
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer
      position='top-center'
      theme='colored'
      autoClose={2000}/>
    
    </>
  )
}

export default EditProject