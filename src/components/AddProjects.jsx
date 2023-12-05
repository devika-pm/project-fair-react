import React,{useContext, useEffect, useState} from 'react'
import { Modal,Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { addProjectAPI } from '../Services/allAPI';
import { AddProjectResponseContext } from '../Context/ContextShare';

function AddProjects() {
  const{addProjectResponse,setAddProjectResponse} = useContext(AddProjectResponseContext)
    const [show, setShow] = useState(false);
    const[projectDetails,setProjectDetails] = useState({
      title:"",languages:"",overview:"",github:"",website:"", projectImage:""
    })
    const[preview,setPreview] = useState("")
    const[token,setToken] = useState("")

  const handleClose = () => {
    setShow(false);
    setProjectDetails({title:"",languages:"",overview:"",github:"",website:"", projectImage:""})
    setPreview("")
  }
  const handleShow = () => setShow(true);
 // console.log(projectDetails);
const handleAdd = async(e)=>{
 e.preventDefault()
 const{title,languages,overview,github,website,projectImage} =projectDetails
 if(!title ||!languages|| !overview|| !github|| !projectImage ||!website){
  toast.info("please fill the form completely")
 }else{
  const reqBody = new FormData()
  reqBody.append("title",title)
  reqBody.append("languages",languages)
  reqBody.append("overview",overview)
  reqBody.append("github",github)
  reqBody.append("projectImage",projectImage)
  reqBody.append("website",website)

  if(token){
  const  reqHeader = {
    "Content-Type":"multipart/form-data",
    "Authorization":`Bearer ${token}`
  }
  const result = await addProjectAPI(reqBody,reqHeader)
  
  if(result.status===200){
    console.log(result.data);
    handleClose()
   setAddProjectResponse(result.data)
  }else{
    console.log(result);
    console.log(result.response.data);
  }
}

 
 }
}


 useEffect(()=>{
  if(projectDetails.projectImage){
    setPreview(URL.createObjectURL(projectDetails.projectImage))
  }
 },[projectDetails.projectImage])
 useEffect(()=>{
     if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
     }else{
      setToken("")
     }
 },[])
  return (
    <div>
      <button onClick={handleShow} variant="primary" className='rounded bg-success p-2' >
        Add Projects
      </button>
         

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='row'>
                <div className='col-lg-6'>
                    <label>
                        <input type='file' style={{display:'none'}} onChange={e=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})}  />
                        <img  className='img-fluid' src={preview?preview: 'https://w7.pngwing.com/pngs/602/266/png-transparent-add-image-icon.png'} alt='no img'/>
                    </label>
                   
                </div>
                <div className='col-lg-6'>
                    <div className='mb-3'>
                        <input type='text' placeholder='project title' className='form-control' value={projectDetails.title} onChange={e=>setProjectDetails({...projectDetails,title:e.target.value})}/>
                    </div>
                    <div className='mb-3'>
                        <input type='text' placeholder='Language Used' className='form-control'  value={projectDetails.languages} onChange={e=>setProjectDetails({...projectDetails,languages:e.target.value})}/>
                    </div>
                    <div className='mb-3'>
                        <input type='text' placeholder='over view' className='form-control'  value={projectDetails.overview} onChange={e=>setProjectDetails({...projectDetails,overview:e.target.value})}/>
                    </div>
                    <div className='mb-3'>
                        <input type='text' placeholder='git hub' className='form-control'  value={projectDetails.github} onChange={e=>setProjectDetails({...projectDetails,github:e.target.value})}/>
                    </div>
                    <div className='mb-3'>
                        <input type='text' placeholder='Website Link' className='form-control'  value={projectDetails.website} onChange={e=>setProjectDetails({...projectDetails,website:e.target.value})}/>
                    </div>

                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer
      position='top-center'
      theme='colored'
      autoClose={2000}/>
    </div>
  )
}


export default AddProjects