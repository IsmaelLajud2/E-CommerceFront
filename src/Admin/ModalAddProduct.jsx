import axios from 'axios'
import React, { useRef, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const ModalAddProduct = () => {
    const [showModal, setShowModal] = useState(false)
    const [error, setError] = useState({})


    const productRef = useRef({
        name: "",
        precio: "",
        category: "",
        imagen: "",

    })



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

    const handleShowModal = () => {
        productRef.current = {
            name: "",
            precio: "",
            category: "",
            imagen: ""
        };
        setError({});
        setShowModal(true);
    };

    const addProductApi = async (e) => {

        e.preventDefault()

        let newError = {}
        if (productRef.current.name === "" || !productRef.current.name) {
            newError.name = "Ingresa un nombre valido"
        }
        if (productRef.current.category === "" || !productRef.current.category) {
            newError.category = "Ingresa una categoria valida"

        }
        const precioValue = productRef.current.precio.trim();
        const precioRegex = /^\d+([.,]\d+)?$/;
        if (!precioValue || !precioRegex.test(precioValue)) {
            newError.precio = "Ingresa un precio válido (números solamente)";
        }
        if (Object.keys(newError).length > 0) {
            setError(newError);
            return;
        }

        if (Object.keys(newError).length === 0) {
            console.log("Producto Creado :", productRef.current)
            try {
                const { data } = await axios.post(
                    'http://localhost:8091/api/productos/createProductos',
                    productRef.current,
                    {
                        headers: {
                            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzcxODcxYjFiYTQwMzkxYTZmMWJlMiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMDUzNjA0MX0.6nu6Ake0YRs--GAEbnwKHzSqLfykkPwgh6x-DOsGQlI",
                        },
                    }

                );

                console.log("Creado con exito ", data)
                toast.success("Producto creado correctamente",)

            } catch (error) {
                console.error("Error al crear el producto:", error.response?.data?.message || error.message);
                toast.error("Error al crear el producto")

            }

            finally {
                closeModal();
            }

        }
    };

    return (
        <>
            <Button variant='success' size="sm" onClick={handleShowModal} >
                Añadir un producto
            </Button>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Agregar un producto a tu web
                    </Modal.Title> </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={addProductApi}>
                        <Form.Group className='mb-3' controlId='name'>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type='text'
                                name='name'
                                defaultValue={productRef.current.name}
                                placeholder='Nombre...'
                                isValid={productRef.current.name && !error.name}
                                onChange={handleChange}
                                isInvalid={!!error.name}>



                            </Form.Control>
                            <Form.Control.Feedback type='invalid'>
                                {error.name}
                            </Form.Control.Feedback>

                        </Form.Group>
                        <Form.Group onSubmit={addProductApi} controlId='precio'>
                            <Form.Label>
                                Precio
                            </Form.Label>
                            <Form.Control
                                type='text'
                                name='precio'
                                placeholder='Precio...'
                                defaultValue={productRef.current.precio}
                                onChange={handleChange}
                                isValid={productRef.current.precio && !error.precio}
                                isInvalid={!!error.precio}
                            >

                            </Form.Control>
                            <Form.Control.Feedback type='invalid'>
                                {error.precio}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group onSubmit={addProductApi} controlId='category'>
                            <Form.Label>
                                Categoría
                            </Form.Label>
                            <Form.Control
                                type='text'
                                name='category'
                                placeholder='Categoría...'
                                onChange={handleChange}
                                isValid={productRef.current.category && !error.category}
                                defaultValue={productRef.current.category}
                                isInvalid={!!error.category}
                            >

                            </Form.Control>
                            <Form.Control.Feedback type='invalid'>
                                {error.category}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group onSubmit={addProductApi} controlId='imagen'>
                            <Form.Label>
                                Imagen
                            </Form.Label>
                            <Form.Control
                                type='text'
                                name='imagen'
                                placeholder='Imagen...'
                                onChange={handleChange}
                                isValid={productRef.current.imagen && !error.imagen}
                                defaultValue={productRef.current.imagen}
                                isInvalid={!!error.imagen}>

                            </Form.Control>
                            <Form.Control.Feedback type='invalid'>
                                {error.imagen}
                            </Form.Control.Feedback>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={closeModal}>Cancelar</Button>

                    <Button variant='primary' onClick={addProductApi}>Crear</Button>

                </Modal.Footer>


            </Modal>
            <ToastContainer></ToastContainer>
        </>
    )
}

export default ModalAddProduct