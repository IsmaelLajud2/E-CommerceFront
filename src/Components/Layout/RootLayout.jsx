import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar1 from '../Navbar1'
import Footer from '../Footer/Footer'
import '../Layout/Layout.css'

const RootLayout = () => {
    return (
        <>
            <div className='header-app'>
                <span className='text-header-promos'>
                    <b className='b-text'> ENVÍOS GRATUITOS</b>
                    PARA PEDIDOS SUPERIORES A 60 €.
                </span>

            </div>
            <Navbar1></Navbar1>
            <main>
                <Outlet>

                </Outlet>

            </main>
            <Footer></Footer>
        </>
    )
}

export default RootLayout
