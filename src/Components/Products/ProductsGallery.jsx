import axios from 'axios'
import React,{useState,useEffect } from 'react'
import CardProducts from './CardProducts'
import { Row, Col } from 'react-bootstrap';



const ProductsGallery = () => {
    const [products, setProducts] = useState([])


    const getAllProducts =async()=>{
        try {
            const response = await axios.get("http://localhost:8091/api/productos/getAvailableProducts")
            setProducts(response.data)
            console.log(response.data)
        } catch (error) {
            return alert ("ERROR DE CONEXION")
        }
    }

  useEffect(() => {
    getAllProducts()
  }, [])






    
    return (
   <>
   <div className='container-products'>
    <h1>Nuevos Productos</h1>

        <Row>
            {products.map((product) =>(
                <Col key={product._id} className='col-md-3'>
                    <CardProducts prod={product}/> 
                </Col>
            ))}
        </Row>
   
   
 
   </div>
   
   </>
  )
}

export default ProductsGallery