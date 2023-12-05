import React,{useState} from 'react'
import { Card,Modal,Row,Col } from 'react-bootstrap'
import projectPic from '../Assets/Screenshot 2023-10-27 112004.png'
import { BASE_URL } from '../Services/baseUrl';

function ProjectCard({project}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
    {project&&
     <Card className='shadow mb-5 btn '  onClick={handleShow}>
      <Card.Img variant="top" src={project?`${BASE_URL}/uploads/${project?.projectImage}`:projectPic} />
      <Card.Body>
        <p style={{fontSize:'20px'}}>{project?.title}</p>
        
        
      </Card.Body>
    </Card>}

    <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col>
                <img style={{height:'200px'}} className='img-fluid'  src={project?`${BASE_URL}/uploads/${project?.projectImage}`:projectPic}  alt=''/>
                </Col>
                <Col md={6}>
                   <p style={{fontSize:'20px'}}>{project?.title}</p>
                   <p>{project?.overview}</p>
                   <p>Language Used :<span className='fw-bolder'>{project?.languages}</span></p>
                </Col>
            </Row>
            <div>
                <a href={project?.github} target='_blank' className='me-5 btn'><i className="fa-brands fa-github fa-2x"></i></a>
                <a href={project?.website} target='_blank' className='me-5 btn'><i className="fa-solid fa-link fa-2x"></i></a>
            </div>
            
        </Modal.Body>
        
      </Modal>
    </>
  )
}

export default ProjectCard