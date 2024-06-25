import React from 'react'
import { Container, Form, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import '../Styles/NavBarStyles.css'
const Navbar1 = () => {

  const navbarStyle1 ={
    backgroundColor: 'black', 
     
  };
  const navWhiteStyle={
    color :'#fff',
    
  }

  const inputStyles ={
    backgroundColor: 'black' ,
      color: '#fff', 
      paddingRight: '40px', 
      fontSize: '16px',
      width: 'calc(100% - 40px)', 
      height: '38px',
    
  }
  
  
  return (
    <Navbar expand="lg"  className="" style={navbarStyle1} sticky="top" >
      <Container fluid>
        <Navbar.Brand href="#" style={navWhiteStyle} >
          <img src='public\GonzaloLOGO.jpeg' className='imagen-brand'></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav 
            className="mx-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          
            <Nav.Link href="#action2" className='mx-4' style={navWhiteStyle} >Zapatillas</Nav.Link>
      
    
            <Nav.Link href="#" className='mx-3' style={navWhiteStyle}>
              Camisetas
            </Nav.Link>
            <Nav.Link href="#" className='mx-3' style={navWhiteStyle}>
              Sudaderas
            </Nav.Link>
          </Nav>
          
          <Form className="d-flex align-items-center" style={navWhiteStyle}>

            <Form.Control
              type="search"
              placeholder="Buscar"
              className="search-input"
              aria-label="Search"
              style={inputStyles}
            
            />
       <img src="searchIcon.svg" alt="Search Icon" className="search-icon"  />
          

        
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navbar1