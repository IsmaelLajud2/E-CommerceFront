import axios from 'axios'
import { useState, useEffect } from 'react'
import Loading from '../Components/Loading'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { Col, Row } from 'react-bootstrap'
import CardAllProducts from '../Components/CardAllProducts'

const ProductsGallery = () => {
  const [products, setProducts] = useState([])

  const [loading, setLoading] = useState(true)

  const getAllProducts = async () => {
    setLoading(true)
    try {
      const response = await axios.get('http://localhost:8091/api/productos/getAvailableProducts')
      setProducts(response.data)

      setLoading(false)
    } catch (error) {
      console.log('error to find products', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  useEffect(() => {
    Aos.init({
      duration: 2000
    })
  }, [])

  return (
        <div className='container-products'>

            {
                loading
                  ? (
                        <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', marginTop: '150px' }}>
                            <Loading />
                        </div>
                    )

                  : (
                        <>
                            <div className='div-textheader'>
                                <h3 className='text-header'>{products.length} PRODUCTOS</h3>

                            </div>

                            <Row >
                                {

                                    products.map((product) => (
                                        <Col

                                        data-aos="fade-right" key={product._id} className='col-md-3'>
                                            <CardAllProducts prod={product}></CardAllProducts>
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
