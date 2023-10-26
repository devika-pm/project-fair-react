import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div  style={{widt:'100%',height:'300px'}} className='d-flex flex-column justify-content-center align-items-center bg-primary'>
         <div className='footer-div d-flex justify-content-evenly w-100 flex-wrap'>
        <div className="website" style={{width:'400px'}}>
        <h4><i className="fa-solid fa-cloud-arrow-up fa-fade"></i> Project Fair</h4>
          <h6>Designed and built with all the love in the world by the Bootstrap team with the help of our contributors.</h6>
           <h6>Code licensed luminar, docs CC BY 3.0.</h6>
            <p>Currently v5.3.2.</p>
        </div>
        <div className="links d-flex flex-column">
          <h4>links</h4>
          <Link to={'/'} style={{textDecoration:'none',color:'white'}}>home</Link>
          <Link to={'/login'} style={{textDecoration:'none',color:'white'}}>login</Link>
          <Link to={'/register'} style={{textDecoration:'none',color:'white'}}>register</Link>

        </div>
        <div className="guides d-flex flex-column">
        <h4>guidess</h4>
          <Link to={'https://getbootstrap.com/'} style={{textDecoration:'none',color:'white'}}>react</Link>
          <Link to={'https://getbootstrap.com/'} style={{textDecoration:'none',color:'white'}}>ruoter</Link>
          <Link to={'https://getbootstrap.com/'} style={{textDecoration:'none',color:'white'}}>react-bootstrap</Link>

        </div>
        <div className="contact">
          <h4>contact us</h4>
          <div className="sub d-flex">
            <input type='text' placeholder='enter your email'/>
            <button className='btn btn-primary ms-3 border rounded'>subscribe</button>
          </div>
          <div className='icons fs-4 d-flex justify-content-evenly mt-3'>
          <Link to={'https://getbootstrap.com/'} style={{textDecoration:'none',color:'white'}}><i className="fa-brands fa-twitter"></i></Link>
          <Link to={'https://getbootstrap.com/'} style={{textDecoration:'none',color:'white'}}><i className="fa-solid fa-envelope"></i></Link>
          <Link to={'https://getbootstrap.com/'} style={{textDecoration:'none',color:'white'}}><i className="fa-brands fa-linkedin"></i></Link>
          <Link to={'https://getbootstrap.com/'} style={{textDecoration:'none',color:'white'}}><i className="fa-brands fa-instagram"></i></Link>
          </div>
        </div>

      </div>
      <p>Copyright © 2023 media player. Built with react.</p>
    </div>
  )
}

export default Footer