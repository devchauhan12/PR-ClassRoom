import React, { useContext, useEffect } from 'react'
import '../assets/Product.css'
import { Container, Row, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { add, getCart } from '../redux/Action'
import { authentication } from './layout'
import { useNavigate } from 'react-router'
import axios from 'axios'

export default function Product() {


    const products = useSelector((state) => state.products)
    const { logedUser, setLogedUser } = useContext(authentication)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleAdd = async (id) => {
        if (logedUser) {
            const currentUser = await axios.get(`http://localhost:3001/LoggedIn`).then((resp) => resp.data)
            let cart = [...products]

            const check = currentUser.cart.some(e => {
                if (e.title === cart[id].title) {
                    e.qty += 1;
                    return true
                }
            })
            if (!check) {
                cart = [{ ...cart[id], qty: 1 }]
                currentUser.cart.push(...cart)
            }

            await axios.put(`http://localhost:3001/users/${logedUser.id}`, currentUser);
            await axios.put(`http://localhost:3001/LoggedIn`, currentUser);
            setLogedUser(currentUser)
            dispatch(add(id));
        } else {
            navigate('/login')
        }
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