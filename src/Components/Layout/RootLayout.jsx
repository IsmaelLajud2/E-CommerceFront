import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar1 from '../Navbar1'
import Footer from '../Footer/Footer'


const RootLayout = () => {
    return (
        <>
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
