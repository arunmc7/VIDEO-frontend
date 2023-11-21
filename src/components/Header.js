import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { UploadCloud } from 'react-feather';
import { Link } from 'react-router-dom';

function Header() {
  return (
    //for icons we use react feather site
    <div>
          <Navbar className="bg-success">
        <Container>
          <Navbar.Brand href="#home">

            {/* when clicked the icon or name in nav bar....should be navigated to home page----Link tag used----attribute [to] is used to give the destination */}

           <Link to={''} style={{textDecoration:"none", color:'black'}}>
              <UploadCloud/>
              <span  className='ms-4'>Video upload</span>
           </Link>
           
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header