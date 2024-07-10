import React, { useState } from 'react'
import axios from 'axios'
import { Modal, Button, Form } from 'react-bootstrap'


const ModalEditproducts = ({ products, setFlag }) => {
    const [showModal, setShowModal] = useState(false)

    const [selectedproducts, setSelectedproducts] = useState({
        _id: products._id || '',
        name: products.name || '',
        precio: products.precio || '',
        category: products.category || '',
        imagen: products.imagen || ''
    })

    const handleClose = () => {
        setShowModal(false)
    }




    const handleShow = () => {
        setSelectedproducts(products)
        setShowModal(true)
    }

    const editproducts = async (e, _id) => {
        e.preventDefault()
        try {
            const response = await axios.patch(`http://localhost:8091/api/productos/edit/${_id}`, selectedproducts, {
                headers: {
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzcxODcxYjFiYTQwMzkxYTZmMWJlMiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMDUzNjA0MX0.6nu6Ake0YRs--GAEbnwKHzSqLfykkPwgh6x-DOsGQlI",
                }

            })
            setFlag((prevFlag) => !prevFlag)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
        finally {
            handleClose()
        }
    }

    return (
        <>
            <Button variant="warning" size='sm' onClick={handleShow}>
                Editar
            </Button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar informacion de los productsos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={editproducts}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre..."
                                value={selectedproducts.name}
                                onChange={(e) => {
                                    setSelectedproducts({
                                        ...selectedproducts,
                                        name: e.target.value
                                    })
                                }}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="precio"
                        >
                            <Form.Label>Precio</Form.Label>
                            <Form.Control type='text' placeholder='Precio...'
                                value={selectedproducts ? selectedproducts.precio : ""}
                                onChange={(e) => setSelectedproducts({
                                    ...selectedproducts,
                                    precio: e.target.value
                                })} />
                        </Form.Group>
                    </Form>
                    <Form.Group
                        className="mb-3"
                        controlId="categoria"
                    >
                        <Form.Label>Categoría</Form.Label>
                        <Form.Control type='text' placeholder='Categoria...'
                            value={selectedproducts ? selectedproducts.category : ""}
                            onChange={(e) => setSelectedproducts({
                                ...selectedproducts,
                                category: e.target.value
                            })} />
                    </Form.Group>
                    <Form.Group
                        className='mb-3'
                        controlId='imagen'>
                        <Form.Label>
                            Imagen
                        </Form.Label>
                        <Form.Control type='text' placeholder='Imagen...' value={selectedproducts ? selectedproducts.imagen : ""}
                            onChange={(e) => setSelectedproducts({
                                ...selectedproducts,
                                imagen: e.target.value
                            })}>

                        </Form.Control>

                    </Form.Group>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={(e) => editproducts(e, selectedproducts._id)}>
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalEditproducts