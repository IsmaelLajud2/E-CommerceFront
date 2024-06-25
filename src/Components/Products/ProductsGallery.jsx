import axios from 'axios'
import React, { useState, useEffect } from 'react'
import CardProducts from './CardProducts'
import { Row, Col } from 'react-bootstrap';
import Loading from './Loading';



const ProductsGallery = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    const getAllProducts = async () => {
        try {
            const response = await axios.get("http://localhost:8091/api/productos/getAvailableProducts")
            setProducts(response.data)
            console.log(response.data)
            setLoading(false)
        } catch (error) {
            return       setLoading(true)
          
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])







    return (
        <>

            <div className='container-products'>
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' ,marginTop:'150px' }} >
                        <Loading />
                    </div>

                ) : (
        <><div>
                            <h3 className='text-header'>{products.length} PRODUCTOS</h3>
                        </div><Row>
                                {products.map((product) => (
                                    <Col key={product._id} className='col-md-3'>
                                        <CardProducts prod={product} />
                                    </Col>
                                ))}
                            </Row></>
                )




                }
            </div>

        </>
    )
}

export default ProductsGallery