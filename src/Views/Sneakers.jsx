import React, { useState, useEffect } from 'react'

import axios from 'axios'

import { Row, Col } from 'react-bootstrap'

import Loading from '../Components/Loading'
import CardSneakers from '../Components/CardSneakers'

const Sneakers = () => {

    const [Snickers, setGetSnickers] = useState([])
    const [loading, setLoading] = useState(false)

    const getInfo = async () => {
        try {
            const response = await axios.get('http://localhost:8091/api/productos/sortedProducts/?category=food')
            setGetSnickers(response.data)
            console.log(setGetSnickers)
            setLoading(false)
        } catch (error) {

            return setLoading(true)
        }
    }

    useEffect(() => {
        getInfo()
    }, [])



    return (
        <>
            <h1>SNEAKERS PARA HOMBRE</h1>
            <div className='container-products'>
                {loading
                    ? (
                        <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', marginTop: '150px' }} >
                            <Loading />
                        </div>

                    )
                    : (
                        <>
                            <div>
                                <b className='text-header'>{Snickers.length} PRODUCTOS</b>
                            </div><Row>
                                {Snickers.map((snicker) => (
                                    <Col key={snicker._id} className='col-md-3'>
                                        <CardSneakers prod={snicker} />
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