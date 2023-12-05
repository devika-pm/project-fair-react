import React, { useContext, useState } from 'react'
import Header from './Header'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { loginAPI, registerAPI } from '../Services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { tokenAuthorContext } from '../Context/AuthToken'

function Auth({register}) {
    const {isAuthorised,setIsAuthorised} = useContext(tokenAuthorContext)
    const Navigate = useNavigate()
    const[userData,setUserData] = useState({
        username:"",email:"",password:""
    })

    const isRegister = register?true:false

    const handleRegister = async(e)=>{
        e.preventDefault()
        const{username,email,password} = userData
        if(!username||!email||!password){
            toast.info("please fill the form completely!!!")
        }else{
            const  result= await registerAPI(userData)
            if(result.status===200){
                toast.success(`${result.data.username} has registered successfully!!!`)
                setUserData({
                    username:"",email:"",password:""
                })
                Navigate('/login')
            }else{
                toast.warning(result.response.data)
                console.log(result);
            }
        }
    }

    const handleLogin = async(e)=>{
        e.preventDefault()
        const{email,password} = userData
        if(!email || !password){
            toast.info("please fill the form completely!!!")
        }else{
            const result = await loginAPI(userData)
            if(result.status===200){
                sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
                sessionStorage.setItem("token",result.data.token)
                setIsAuthorised(true)
                setUserData({
                    email:"",password:""
                })
                Navigate('/')
            }else{
                toast.warning(result.response.data)
                console.log(result);
            }
        }
    }

  return (
    <div style={{color:'white'}}>
        <Header/>
        <div style={{width:'100%',height:'100vh'}} className='d-flex justify-content-center align-items-center'>
            <div className='w-75 container'>
                <Link to={'/'} style={{textDecoration:'none'}}> <i className="fa-solid fa-arrow-left me-2"></i>Back To Home</Link>
                <div className='p-5 card shadow bg-sucess'>
                    <div className='row align-items-center'>
                        <div className='col-lg-6'>
                            <img src='https://swoopnow.com/wp-content/uploads/2020/07/User-Authentication_-Understanding-the-Basics-Top-Tips.jpg' className='rounded-start w-100' alt='auth pic/'/>
                        </div>
                        <div className='col-lg-6'>
                            <div className='d-flex align-items-center flex-column'>
                            <p style={{fontSize:'20px'}} className='fw-bolder text-white mt-2'>
                            <i className="fa-brands fa-stack-overflow fa-fade"></i>  Project Fair
                            </p> 
                            <p className='fw-bolder mt-4 pb-3'>
                                {
                                    isRegister ? 'Sign Up To Your Account' : 'Sign In To Your Account'
                                }

                            </p>
                            <Form className='text-light w-100'>
                            {
                                isRegister &&
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                             
                             <Form.Control type="text" placeholder="Enter your name"  value={userData.username} onChange={e=>setUserData({...userData,username:e.target.value})}/>
                              
                                </Form.Group>
                            }
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                             
                             <Form.Control type="email" placeholder="Enter your email-id" value={userData.email} onChange={e=>setUserData({...userData,email:e.target.value})} />
                              
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                             
                             <Form.Control type="password" placeholder="Enter your password" value={userData.password} onChange={e=>setUserData({...userData,password:e.target.value})} />
                              
                                </Form.Group>
                                {
                                    isRegister ?
                                    <div style={{color:'white'}}>
                                        <button className='btn btn-light border rounded' onClick={handleRegister}>Register</button>
                                        <p className='text-light' >already have an account? clicke here to <Link to={'/login'}>Login</Link></p>
                                    </div>:
                                    <div>
                                        <button className='btn btn-light border rounded' onClick={handleLogin}>Login</button>
                                        <p className='text-light'>new user? clicke here to  <Link to={'/register'}>Register</Link></p>

                                    </div>
                                }


                            </Form>

                            </div>
                        </div>
    
                    </div>
    
                </div>
            </div>

        </div>
        <ToastContainer
      position='top-center'
      theme='colored'
      autoClose={2000}/>
    </div>
    
  )
}

export default Auth