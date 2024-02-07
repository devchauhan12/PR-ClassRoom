import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Form, Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { authentication } from './layout'
import axios from 'axios'
import { deleteItem } from '../redux/Action'

const NavBar = () => {
    const cart = useSelector((state) => state.cart)

    const { login, setLogin } = useContext(authentication)
    const { logedUser, setLogedUser } = useContext(authentication)
    const navigate = useNavigate()
    const dispatch = useDispatch    ();

    const handleLogout = () => {
        setLogin(false);
        setLogedUser(null)
        axios.put('http://localhost:3001/LoggedIn', {});
        dispatch(deleteItem());
        navigate('/')
    }
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary py-3">
            <Container fluid>
                <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/products"> Products </Nav.Link>
                    </Nav>
                    <div className={`d-flex`}>
                        <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />

                        {
                            !login ? <>
                                <button onClick={() => navigate('/login')}>SignIn/SignUp</button>
                            </>
                                :
                                <>
                                    <Nav.Link as={Link} to="/cart" className='card-button me-4 position-relative d-block text-white'>
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {logedUser.cart.length}
                                        </span>
                                        <i className="las la-shopping-cart"></i>
                                    </Nav.Link>
                                    <button onClick={handleLogout}>
                                        Log Out
                                    </button>
                                </>

                        }
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar