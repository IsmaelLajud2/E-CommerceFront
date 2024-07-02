import { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import Loading from '../Components/Loading'
import CamisetasCard from '../Components/CamisetasCard'

const CamisetasGallery = () => {

    const [camisetas, setCamisetas] = useState([])

    const [loading, setLoading] = useState(false)

    const getProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8091/api/productos/sortedProducts/?category=camisetas')
            setCamisetas(response.data)
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
                                <b>{camisetas.length} Productos</b> </div>
                            <Row>
                                {
                                    camisetas.map((camiseta) => (
                                        <Col className='col-md-3'>
                                            <CamisetasCard key={camiseta._id} prod={camiseta} ></CamisetasCard>
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