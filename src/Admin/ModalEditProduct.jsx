import React, { useState } from 'react'
import axios from 'axios'
import { Modal, Button, Form } from 'react-bootstrap'
const ModalEditProduct = ({ product }) => {
    const [showModal, setShowModal] = useState(false)
    const [flag, setFlag] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState({
        _id: product._id || '',
        name: product.name || '',
        precio: product.precio || '',
        category: product.category || '',
        imagen: product.imagen || ''
    })

    const handleClose = () => {
        setShowModal(false)
    }

    const handleShow = () => {
        setSelectedProduct(product)
        setShowModal(true)
    }

    const editProduct = async ({ target }, _id) => {
        try {
            const response = await axios.patch(`http://localhost:8091/api/productos/edit/${_id}`, { selectedProduct: target.value }, {
                headers: {
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzcxODcxYjFiYTQwMzkxYTZmMWJlMiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMDUzNjA0MX0.6nu6Ake0YRs--GAEbnwKHzSqLfykkPwgh6x-DOsGQlI"
                }

            })
            setFlag(!flag)
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
                    <Modal.Title>Editar informacion de los productos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre..."
                                value={selectedProduct ? selectedProduct.name : ""}
                                onChange={(e) => {
                                    setSelectedProduct({
                                        ...selectedProduct,
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
                                value={selectedProduct ? selectedProduct.precio : ""}
                                onChange={(e) => setSelectedProduct({
                                    ...selectedProduct,
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
                            value={selectedProduct ? selectedProduct.category : ""}
                            onChange={(e) => setSelectedProduct({
                                ...selectedProduct,
                                category: e.target.value
                            })} />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="imagen"
                    >
                        <Form.Label>Imagen...</Form.Label>
                        <Form.Control type='text' placeholder='Imagen...'
                            value={selectedProduct ? selectedProduct.imagen : ""}
                            onChange={(e) => setSelectedProduct({
                                ...selectedProduct,
                                imagen: e.target.value
                            })} />
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={(e) => editProduct(e, selectedProduct._id)}>
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalEditProduct