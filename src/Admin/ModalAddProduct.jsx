import axios from 'axios'
import React, { useRef, useState } from 'react'
import { Button, Container, Form, FormGroup, Modal, Row } from 'react-bootstrap'


const ModalAddProduct = () => {
    const [showModal, setShowModal] = useState(true)
    const [error, setError] = useState({})


    const productRef = useRef({
        name: "",
        precio: "",
        category: "",
        imagen: "",

    })


    const handleShowModal = () => {
        setShowModal(showModal)

    }
    const closeModal = () => {
        setShowModal(false)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        productRef.current = {
            ...productRef.current,
            [name]: value
        }
    }
    const addProductApi = async (e) => {

        e.preventDefault()

        let newerror = {}
        if (productRef.current.name === "" || !productRef.current.name) {
            newerror.name = "Ingresa un nombre valido"
        }
        if (productRef.current.category === "" || !productRef.current.category) {
            newerror.category = "Ingresa una categoria valida"

        }
        if (productRef.current.precio === "" || !productRef.current.precio) {
            newerror.precio = "Ingresa un numero valido"
        }
        setError(newerror)

        try {
            const response = await axios.post(`http://localhost:8091/api/productos/createProductos`, productRef.current, {
                headers: {
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzcxODcxYjFiYTQwMzkxYTZmMWJlMiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMDUzNjA0MX0.6nu6Ake0YRs--GAEbnwKHzSqLfykkPwgh6x-DOsGQlI",
                }
            })
            console.log("Producto creado", response)
            return alert("Creado con exito")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Button variant='succcess' size="sm" onClick={handleShowModal} >
                Añadir un producto
            </Button>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Agregar un producto a tu web
                    </Modal.Title>
                    <Modal.Body>
                        <Form onSubmit={addProductApi}>
                            <Form.Group className='mb-3' controlId='name'>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type='text'
                                    defaultValue={productRef.current.name}
                                    placeholder='Nombre...'
                                    isValid={productRef.current.name && !error.name}
                                    onChange={handleChange}>


                                </Form.Control>

                            </Form.Group>
                            <Form.Group onSubmit={addProductApi} controlId='precio'>
                                <Form.Label>
                                    Precio
                                </Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Precio...'
                                    defaultValue={productRef.current.precio}
                                    onChange={handleChange}
                                    isInvalid={productRef.current.precio && !error.precio}
                                >

                                </Form.Control>
                            </Form.Group>
                            <Form.Group onSubmit={addProductApi} controlId='category'>
                                <Form.Label>
                                    Categoría
                                </Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Precio...'
                                    onChange={handleChange}
                                    isValid={productRef.current.category && !error.category}
                                >

                                </Form.Control>
                            </Form.Group>
                            <Form.Group onSubmit={addProductApi} controlId='imagen'>
                                <Form.Label>
                                    Imagen
                                </Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Imagen...'
                                    onChange={handleChange}
                                    isValid={productRef.current.imagen && !error.imagen}>

                                </Form.Control>
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='danger' onClick={closeModal}>Cancelar</Button>
                        <Button variant='primary' onClick={(e) => addProductApi(e, productRef.current)}>Crear</Button>
                    </Modal.Footer>
                </Modal.Header>

            </Modal>
        </>
    )
}

export default ModalAddProduct