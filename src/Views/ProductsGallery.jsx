import axios from 'axios'
import { useState, useEffect } from 'react'
import Loading from '../Components/Loading'
import CardProducts from '../Components/CardProducts'
import { Col, Row } from 'react-bootstrap'


const ProductsGallery = () => {
    const [products, setProducts] = useState([])
    const [sortedPrice, setSortedPrice] = useState([])
    const [order, setOrder] = useState("price_asc")
    const [loading, setLoading] = useState(true)

    const getAllProducts = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`http://localhost:8091/api/productos/getAvailableProducts`)
            setProducts(response.data)
            setSortedPrice(response.data)
            setLoading(false)

        } catch (error) {
            console.log("error to find products", error)
            setLoading(false)
        }

    }

    const getFilterByPriceProducts = async (order) => {
        setLoading(true)
        try {
            const response = await axios.get(`http://localhost:8091/api/productos/sortedProducts/${order}`)
            setSortedPrice(response.data)
            setLoading(false)
        } catch (error) {
            console.log("error to find products", error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])


    useEffect(() => {
        getFilterByPriceProducts(order)
    }, [order])




    const handleChange = (e) => {
        setOrder(e.target.value)
    }



    return (
        <div className='container-products'>
            <select value={order} onChange={handleChange} >
                <option value="" disabled >Seleccionar</option>
                <option value="price_asc">Precio mas barato</option>
                <option value="price_desc">Precio mas caro</option>
            </select>
            {
                loading ?
                    (
                        <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', marginTop: '150px' }}>
                            <Loading />
                        </div>
                    ) :

                    (
                        <>
                            <div className='div-textheader'>
                                <h3 className='text-header'>{products.length} PRODUCTOS</h3>
                            </div>
                            <Row>
                                {

                                    sortedPrice.map((product) => (
                                        <Col key={product._id} className='col-md-3'>
                                            <CardProducts prod={product}></CardProducts>
                                        </Col>
                                    ))


                                }
                            </Row>
                        </>
                    )


            }


        </div>
    )
}


export default ProductsGallery