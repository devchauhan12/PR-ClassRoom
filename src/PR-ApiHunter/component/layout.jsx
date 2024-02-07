import React, { createContext, useEffect, useState } from "react";
import NavBar from "./Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./login";
import Product from "./Product";
import Cart from "./cart";
import Home from "./Home";
import axios from "axios";


export const authentication = createContext()

const Layout = () => {
    const [users, setUsers] = useState([])
    const [login, setLogin] = useState(false)
    const [logedUser, setLogedUser] = useState(null)


    useEffect(() => {
        findUser()
    }, [])
    async function findUser() {
        const user = await axios.get('http://localhost:3001/LoggedIn')
            .then(function (response) {
                return response.data
            })
        if (Object.keys(user).length > 0) {
            setLogin(true)
            setLogedUser(user)
        }
    }

    return (
        <BrowserRouter>
            <authentication.Provider value={{ users, setUsers, login, setLogin, logedUser, setLogedUser }}>
                <NavBar />
                <Routes>
                    {
                        !login ? (
                            <>
                                <Route path='/' element={<Home />} />
                                <Route path='/login' element={<Login />} />
                                <Route path='/products' element={<Product />} />
                            </>
                        ) : (
                            <>
                                <Route path='/' element={<Home />} />
                                <Route path='/products' element={<Product />} />
                                <Route path='/cart' element={<Cart />} />
                            </>
                        )
                    }
                </Routes>
            </authentication.Provider>
        </BrowserRouter>


    )
}

export default Layout