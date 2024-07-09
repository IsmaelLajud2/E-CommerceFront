import { Row, Col, Form } from 'react-bootstrap'
import Loading from '../Components/Loading'
import CardAllProducts from '../Components/CardAllProducts'
import useFilteredProducts from '../Hooks/SortedProducts'


const CamisetasGallery = () => {

    const { products, loading, setOrder, order } = useFilteredProducts("camisetas")


    const handleChange = (e) => {
        setOrder(e.target.value)
    }

    return (
        <>
            <h1>CAMISETAS PARA HOMBRE</h1>
            {
                loading ?
                    (
                        <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', marginTop: '150px' }} >
                            <Loading />
                        </div>
                    )
                    :
                    (
                        <>
                            <div className='div-textheader'>
                                <b className='text-header'>{products.length > 0 ? `${products.length} ${products.length === 1 ? "PRODUCTO" : "PRODUCTOS"}` : "PRODUCTO NO DISPONIBLE"}</b>

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
                                {
                                    products.map((product) => (
                                        <Col className='col-md-3' key={product._id}>
                                            <CardAllProducts prod={product} />
                                        </Col>
                                    ))
                                }
                            </Row>

                        </>

                    )
            }






        </>
    )
}

export default CamisetasGallery