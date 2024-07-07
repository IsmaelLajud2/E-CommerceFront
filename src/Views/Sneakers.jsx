import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Row, Col } from 'react-bootstrap'

import Loading from '../Components/Loading'
import CardAllProducts from '../Components/CardAllProducts'
import useFilteredProducts from '../Hooks/SortedProducts'


const Sneakers = () => {

    const { products, loading, setOrder, order } = useFilteredProducts("food")

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
                                <select onChange={handleChange} value={order}>
                                    <option value="" disabled>Seleccionar</option>
                                    <option value="price_asc">Precio más barato primero ⬆</option>
                                    <option value="price_desc">Precio más caro primero ⬇ </option>
                                </select>
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