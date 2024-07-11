import React from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import Loading from '../Components/Loading'
import CardAllProducts from '../Components/CardAllProducts'
import useFilteredProducts from '../Hooks/SortedProducts'


const Sneakers = () => {

    const { products, loading, setOrder, order } = useFilteredProducts("zapatillas")

    const handleChange = (e) => {
        setOrder(e.target.value)
    }


    return (
        <>
            <h1 >SNEAKERS PARA HOMBRE</h1>
            <div className='container-products'>
                {loading
                    ? (
                        <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', marginTop: '150px' }} >
                            <Loading />
                        </div>

                    )
                    : (
                        <>
                            <div className='div-textheader'>
                                <b className='text-header'>{products.length} PRODUCTOS</b>
                                <Form.Select onChange={handleChange} value={order}
                                    style={{
                                        width: 'auto',
                                        maxWidth: '270px', backgroundColor: '#333333', color: "white"
                                    }}>
                                    <option value="" disabled>Seleccionar</option>
                                    <option value="price_asc">Mas barato primero ⬆</option>
                                    <option value="price_desc">Mas caro primero ⬇</option>
                                </Form.Select>
                            </div><Row>
                                {products.map((product) => (
                                    <Col key={product._id} className='col-md-3'>
                                        <CardAllProducts prod={product} />
                                    </Col>
                                ))}
                            </Row></>
                    )

                }
            </div>
        </>
    )
}

export default Sneakers