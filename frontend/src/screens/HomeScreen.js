import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'

const HomeScreen = () => { // bring in products, loop through products and output each one with own component
    const [products, setProducts] = useState([])
    //useEffect will run the callback function as soon as the component loads
    useEffect(() => { // make axios request here
        const fetchProducts = async () => {
            const { data } = await axios.get('/api/products')

            setProducts(data)
        }
        fetchProducts()
    }, [])//second argument is what's being passed when page changes. Now is []
    return (
        <>
            <h1>Latest Builds</h1>
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} lx={3}>
                        <Product product={product }/>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomeScreen