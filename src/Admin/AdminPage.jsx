import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Col, Container, Row, Table, Button, Form, Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, InputGroup } from 'react-bootstrap'
import Loading from '../Components/Loading'
import ModalEditProduct from './ModalEditProduct'
import ModalAddProduct from './ModalAddProduct'
import '../Admin/AdminStyles.css'
const AdminPage = () => {
  const [getAllProducts, setGetAllProduct] = useState([])
  const [loading, setLoading] = useState(true)
  const [flag, setFlag] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [productoToDelete, setProductoToDelete] = useState(null)
  const [search, setSearch] = useState('')

  const apiFetch = async () => {
    setLoading(true)
    try {
      const response = await axios.get('http://localhost:8091/api/productos/getAllProducts/', {
        headers: {
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzcxODcxYjFiYTQwMzkxYTZmMWJlMiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMDUzNjA0MX0.6nu6Ake0YRs--GAEbnwKHzSqLfykkPwgh6x-DOsGQlI'
        }
      })
      setGetAllProduct(response.data)
      setLoading(false)
    } catch (error) {
      console.log({ error })
      setLoading(true)
    }
  }

  const disableProduct = async ({ target }, _id) => {
    try {
      const response = await axios.patch(`http://localhost:8091/api/productos/edit/${_id}`, { disabled: !target.checked }, {
        headers: {
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzcxODcxYjFiYTQwMzkxYTZmMWJlMiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMDUzNjA0MX0.6nu6Ake0YRs--GAEbnwKHzSqLfykkPwgh6x-DOsGQlI'
        }
      })
      setFlag(!flag)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteProduct = async (_id) => {
    try {
      const response = await axios.delete(`http://localhost:8091/api/productos/delete/${_id}`, { headers: { 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzcxODcxYjFiYTQwMzkxYTZmMWJlMiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMDUzNjA0MX0.6nu6Ake0YRs--GAEbnwKHzSqLfykkPwgh6x-DOsGQlI' } })
      setFlag(!flag)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteConfirmation = (productId) => {
    setProductoToDelete(productId)
    setShowModal(true)
  }

  const handleDelete = () => {
    deleteProduct(productoToDelete)
    setShowModal(false)
  }

  const searcher = (e) => {
    setSearch(e.target.value)
    console.log(e.target.value)
  }

  const results = !search
    ? getAllProducts
    : getAllProducts.filter((dato) => {
      const lowerCase = search.toLowerCase()
      return (
        dato.name.toLowerCase().includes(lowerCase) || dato._id.toLowerCase().includes(lowerCase) || dato.category.toLowerCase().includes(lowerCase)
      )
    })

  useEffect(() => {
    apiFetch()
  }, [flag])

  return (
        <>
            {

                loading
                  ? (

                    <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                        <Loading> </Loading >
                    </div>
                    )
                  : (
                    <Container className='main-container'>
                        <Row className='d-flex align-items-center '>
                        <Col xs="auto" className="d-flex align-items-center">
                            <h1 >Administrador de productos</h1>
                            </Col>
                            <Col xs="auto" className='search-col'>
                            <InputGroup size="default" className="search-input-group">
                            <InputGroup.Text id="inputGroup-sizing-default" >

                            🔍
                            </InputGroup.Text>
                            <Form.Control value={search} onChange={searcher} type='text' placeholder='Buscar por id, nombre o categoria...'></Form.Control>

                            </InputGroup>
                            </Col>

                <Col xs="auto" className='modal-button'>
                  <ModalAddProduct ></ModalAddProduct>
                </Col>

                            {
                                <Table striped bordered variant='grey'>
                                    <thead>
                                        <tr>
                                            <th>id del producto</th>
                                            <th>Nombre</th>
                                            <th>Categoría</th>
                                            <th>Precio</th>
                                            <th>Estado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            results &&
                                            results.map((product, i) =>

                                                <tr key={i}>
                                                    <td>{product._id}</td>
                                                    <td>{product.name}</td>
                                                    <td>{product.category}</td>
                                                    <td>{product.precio}</td>
                                                    <td>
                                                        <Form.Check
                                                            checked={!product.disabled}
                                                            onChange={(e) => disableProduct(e, product._id)} >

                                                        </Form.Check>
                                                    </td>
                                                    <td>
                                                        <Button variant='danger' size='sm' className='mx-2' onClick={() => (handleDeleteConfirmation(product._id))}>BORRAR</Button>
                                                        <ModalEditProduct products={product} setFlag={setFlag} >EDITAR</ModalEditProduct>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </Table>
                            }
                        </Row>
                        <Col>
                            <Modal show={showModal} onHide={() => setShowModal(false)}>
                                <ModalHeader closeButton>
                                    <ModalTitle>  Confirmar Eliminacion</ModalTitle>  </ModalHeader>
                                <ModalBody>  Estas seguro que deseas borrar el producto?</ModalBody>
                                <ModalFooter>
                                    <Button variant='secondary' onClick={() => setShowModal(false)}> Cancelar</Button>
                                    <Button variant='danger' onClick={handleDelete}>Eliminar</Button>
                                </ModalFooter>

                            </Modal>
                        </Col>
                    </Container >
                    )

            }

        </>
  )
}

export default AdminPage
