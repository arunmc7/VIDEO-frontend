import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


//to use grid in react bootstrap we need to import row and coloum first

function Landingpage() {

  //useNavigate() is a hook

  const navigate=useNavigate()

  

    const handleNavigate=()=>{

      //navigate to home page

      navigate('/home')

    }
  
  return (
    <div>

        <Row className='align-item-center'>

            <Col></Col>
            <Col lg={6}>
                <h1 style={{fontFamily:'Anton'}}>WELCOME TO VIDEO.COM</h1>
                <p>Where user can use their favorite videos user can upload any youtube video by copying and pasting their url. Vieo.com will allow to add and remove their uploaded videos and also arrange them in different categories by drop. It is free , try it....NOW!!!!!</p>

                <button onClick={handleNavigate} className='btn btn-primary'>Click here to know more !!!!</button>
            </Col>
            <Col lg={4}>
                <img className='img-fluid' src="https://images.unsplash.com/photo-1616356607338-fd87169ecf1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWMlMjBwbGF5ZXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="No image" />
            </Col>
            <Col></Col>

        </Row>
    </div>
  )
}

export default Landingpage