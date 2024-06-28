import { useState, useEffect } from 'react'
import axios from 'axios'
import Loading from '../Components/Loading'
import CardSudaderas from '../Components/CardSudaderas'
import { Col, Row } from 'react-bootstrap'

const Sudaderas = () => {
    const [sudaderas, setSudaderas] = useState([])
    const [loading, setLoading] = useState(false)


    const getProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8091/api/productos/sortedProducts/?category=sudaderas');
            setSudaderas(response.data)
            console.log(response)
            setLoading(false)
        } catch (error) {
            return setLoading(true)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

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
                        <><div>
                            <b className='text-header'>{sudaderas.length} PRODUCTOS</b>
                        </div>
                            <Row>
                                {sudaderas.map((sudadera) => (


                                    <Col key={sudadera._id} className='col-md-3'>
                                        <CardSudaderas prod={sudadera} />
                                    </Col>
                                ))}
                            </Row></>
                    )


            }

        </>
    )
}

export default Sudaderas