import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Row,
    Col,
    Image,
    ListGroup,
    Card,
    Button,
} from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Link, useParams } from 'react-router-dom'  
import { listProductDetails } from '../actions/productActions'


const ProductScreen = ( {match} ) => {
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
    // const params = useParams()
    // const product = products.find((p) => p._id === params.id) fetching from frontend
    const { id } = useParams()
    // const [product, setProduct] = useState({})

    useEffect(() => {
        // const fetchProduct = async () => {
        // const { data } = await axios.get(`/api/products/${id}`)
        // setProduct(data)
        // }
        // fetchProduct()
        dispatch(listProductDetails(id))
    }, [dispatch, id])

    

    return (
        <>
        <Link className="btn btn-dark my-3" to="/">
            Go Back
        </Link>
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Row>
            <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
            <ListGroup variant="flush">
                <ListGroup.Item>
                <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                />
                </ListGroup.Item>
                <ListGroup.Item>price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>Description: {product.description}</ListGroup.Item>
            </ListGroup>
            </Col>
            <Col md={3}>
            <Card>
                <ListGroup variant="flush">
                <ListGroup.Item>
                    <Row>
                    <Col>Price:</Col>
                    <Col>
                        <strong>${product.price}</strong>
                    </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                    <Col>Status:</Col>
                    <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button className='w-100' type="button" disabled={product.countInStock === 0}>
                    Add To Cart
                    </Button>
                </ListGroup.Item>
                </ListGroup>
            </Card>
            </Col>
        </Row>
        )}
        </>
    )
}

export default ProductScreen
