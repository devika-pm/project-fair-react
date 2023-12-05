import React,{useEffect, useState} from 'react'
import { Collapse } from 'react-bootstrap';
import { BASE_URL } from '../Services/baseUrl';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { editUserAPI } from '../Services/allAPI';

function MyProfile() {
  
  const [open, setOpen] = useState(false);
  const[userProfile,setUserProfile] = useState({
    username:"",email:"",password:"",profile:"",github:"",linkedin:""
  })
const [existingImage,setExistinImage] = useState("")
const[preview,setPreview] = useState("")

useEffect(()=>{
  const user = JSON.parse(sessionStorage.getItem("existingUser"))
  setUserProfile({...userProfile,username:user.username,email:user.email,
    password:user.password,profile:"",github:user.github,linkedin:user.linkedin})
    setExistinImage(user.profile)
 
},[open])

useEffect(()=>{
  if(userProfile.profile){
    setPreview(URL.createObjectURL(userProfile.profile))
  }else{
    setPreview("")
  }
},[userProfile.profile])

const handleProfileUpdate = async()=>{
  const {username,email,password,profile,github,linkedin} = userProfile
  if(!github || !linkedin){
     toast.info("please fill the form completely")
  }else{
    const reqBody = new FormData()
    reqBody.append("username",username)
          reqBody.append("email",email)
          reqBody.append("password",password)
          reqBody.append("github",github)
         
          reqBody.append("linkedin",linkedin)
          preview?reqBody.append("profileImage",profile):reqBody.append("profileImage",existingImage)
          const token = sessionStorage.getItem("token")
       if(preview){
        const  reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        const res = await editUserAPI(reqBody,reqHeader)
        if(res.status===200){
          setOpen(!open)
          sessionStorage.setItem("existingUser",JSON.stringify(res.data))
        } else{
          setOpen(!open)
          console.log(res);
          console.log(res.response.data);
        }
       }else{
        const  reqHeader = {
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
        const res = await editUserAPI(reqBody,reqHeader)
        if(res.status===200){
          setOpen(!open)
          sessionStorage.setItem("existingUser",JSON.stringify(res.data))
        } else{
          setOpen(!open)
          console.log(res);
          console.log(res.response.data);
        }
       }

  }
}

  return (
    <div className='card shadow p-5 '>
      <div className='d-flex justify-content-between'>
        <p> profile</p>
        <button onClick={() => setOpen(!open)} className='btn btn-outline-primary'><i class="fa-solid fa-check text-success"></i></button>
      </div>
      <Collapse in={open}>
       <div  className='row justify-content-center mt-3' >
          <div className='row justify-content-center mt-3'>
            {/* upload picture */}
            <label className='text-center'>
              <input id='profile' type='file' style={{display:'none'}} onChange={e=>setUserProfile({...userProfile,profile:e.target.files[0]})}/>
              {
                existingImage!==""?
                <img width={'200px'} height={'200px'} className='rounded-circle' src={ preview?preview:`${BASE_URL}/uploads/${existingImage}`}  alt='upload pic'/> 
                :
                <img width={'200px'} height={'200px'} className='rounded-circle' src={ preview?preview :"https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"}  alt='upload pic'/>
                }
            </label>
    
          </div>
          <div className='mt-3'>
            <input type='text' className='form-control' placeholder='git-hub link' value={userProfile.github} onChange={e=>setUserProfile({...userProfile,github:e.target.value})}/>
          </div>
          <div className='mt-3'>
            <input type='text' className='form-control' placeholder='Linked-in link' value={userProfile.linkedin} onChange={e=>setUserProfile({...userProfile,linkedin:e.target.value})}/>
          </div>
          <div className='mt-3 mb-3'>
            <button className='btn btn-warning' onClick={handleProfileUpdate}>Update</button>
          </div>
       </div>
      </Collapse>
      
      <ToastContainer
      position='top-center'
      theme='colored'
      autoClose={2000}/>
        

    </div>
  )
}

export default MyProfile