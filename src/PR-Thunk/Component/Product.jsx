import React, { useState } from 'react'
import '../Assets/Product.css'
import { Container, Row, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { add } from '../Redux/Action'

export default function Product() { 

    const products = useSelector((state) => state.products)
    const dispatch = useDispatch()
    const handleAdd = (id) => {
        dispatch(add(id));
    }

    return (
        <Container className='mt-3'>
            <Row>
                {products.map((item, index) => (
                    <Card className='mt-3 bg-dark text-white' key={index}>
                        <Card.Img src={item.img} className='img' />
                        <h2 className='title position-absolute w-100'>{item.title}</h2>
                        <h3 className='title position-absolute w-100' style={{ transform: "translate(-50%, 100%)" }}>₹ {item.price}</h3>
                        <div className='content'>
                            <div className='sizeContainer'>
                                <p className='sizeTitle'>Size:</p>
                                {
                                    item.variant.size.map((e, i) => {
                                        return <span className='sizeNumber' key={i}>{e}</span>
                                    })
                                }
                            </div>
                            <div className='colorContainer'>
                                <p className='colorTitle'>Color:</p>
                                <span className='colorCircle'></span>
                                <span className='colorCircle'></span>
                                <span className='colorCircle'></span>
                            </div>
                        </div>
                        <Button variant="light" className='link' onClick={() => handleAdd(index)}>Add Cart</Button>
                    </Card>
                ))}
            </Row>
        </Container>
    )
}