import React from 'react'
import { Container, Form, Nav, Navbar, NavbarText, NavDropdown } from 'react-bootstrap'
import '../Styles/NavBarStyles.css'
import { Link } from 'react-router-dom'
const Navbar1 = () => {

  const navbarStyle1 = {
    backgroundColor: 'black',

  };
  const navWhiteStyle = {
    color: '#fff',

  }

  const inputStyles = {
    backgroundColor: 'black',
    color: '#fff',
    paddingRight: '40px',
    fontSize: '16px',
    width: 'calc(100% - 40px)',
    height: '38px',

  }


  return (
    <Navbar expand="lg" className="" style={navbarStyle1} sticky="top" >
      <Container fluid>
        <Navbar.Brand href="/" style={navWhiteStyle} >
          <img src='public\GonzaloLOGO.jpeg' className='imagen-brand'></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mx-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavbarText className='navheadear'>
              <Link to={"/zapatillas"} className='navbar-link mx-4' style={navWhiteStyle} >Zapatillas</Link>
            </NavbarText>

            <NavbarText>
              <Link to={"/sudaderas"} className=' navbar-link mx-4' style={navWhiteStyle} >Sudaderas</Link>
            </NavbarText>
            <NavbarText>
              <Link to={"/camisetas"} className='navbar-link mx-4' style={navWhiteStyle} >Camisetas</Link>
            </NavbarText>
          </Nav>

          <Form className="d-flex align-items-center" style={navWhiteStyle}>

            <Form.Control
              type="search"
              placeholder="Buscar"
              className="search-input"
              aria-label="Search"
              style={inputStyles}

            />
            <img src="searchIcon.svg" alt="Search Icon" className="search-icon" />



          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navbar1