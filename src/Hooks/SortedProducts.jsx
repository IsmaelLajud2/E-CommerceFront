import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useFilteredProducts = (initialCategory, initialOrder = "price_asc") => {

    const [products, setProducts] = useState([])
    const [order, setOrder] = useState(initialOrder)
    const [loading, setLoading] = useState(true)

    const getProducts = async (category, order) => {
        setLoading(true)
        try {
            const response = await axios.get(`http://localhost:8091/api/productos/sortedProducts/${order}?category=${category}`)
            setProducts(response.data)
            setLoading(false)

        } catch (error) {
            console.log(`Error to find product`, error)
            setLoading(true)
        }
    }


    useEffect(() => {

        getProducts(initialCategory, order)

    }, [initialCategory, order])




    return { products, loading, setOrder, order }
}

export default useFilteredProducts