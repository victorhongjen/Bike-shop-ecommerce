import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'

const HomeScreen = () => {
        // bring in products, loop through products and output each one with own component
    const dispatch = useDispatch()

    // productList has to be the same as what it is called in the store reducer
    const productList = useSelector((state) => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <>
        <h1>Latest Builds</h1>
        {loading ? (
            <Loader />
        ) : error ? (
            <Message variant='danger'>{error}</Message>
        ) : (
            <Row>
            {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} lx={3}>
                <Product product={product} />
                </Col>
            ))}
            </Row>
        )}
        </>
    )
}

export default HomeScreen
