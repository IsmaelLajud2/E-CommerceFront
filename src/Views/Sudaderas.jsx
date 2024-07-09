import React from 'react'
import Loading from '../Components/Loading'

import { Col, Row, Form } from 'react-bootstrap'
import CardAllProducts from '../Components/CardAllProducts'
import useFilteredProducts from '../Hooks/SortedProducts'

const Sudaderas = () => {
    const { products, loading, setOrder, order } = useFilteredProducts("sudaderas")

    const handleChange = (e) => {
        setOrder(e.target.value)
    }


    return (

        <>
            <h1>SUDADERAS PARA HOMBRE</h1>

            {
                loading
                    ? (
                        <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', marginTop: '150px' }} >
                            <Loading />
                        </div>

                    )
                    : (
                        <><div className='div-textheader'>
                            <b className='text-header'>{products.length} PRODUCTOS</b>
                            <Form.Select onChange={handleChange} className='ms-3' value={order} style={{
                                width: 'auto',
                                maxWidth: '270px', backgroundColor: '#333333', color: "white"
                            }}>
                                <option disabled>Seleccionar</option>
                                <option value="price_asc">Precio más barato primero ⬆</option>
                                <option value="price_desc">Precio más caro primero ⬇ </option>
                            </Form.Select>

                        </div>
                            <Row>
                                {products.map((product) => (


                                    <Col key={product._id} className='col-md-3'>
                                        <CardAllProducts prod={product} />
                                    </Col>
                                ))}
                            </Row></>
                    )


            }

        </>
    )
}

export default Sudaderas