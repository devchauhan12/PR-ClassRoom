import React, { useEffect, useState } from 'react'
import '../Assets/Routing.css'
import { useNavigate, useParams } from 'react-router'

export default function AddUser({ data, setData, state, setState }) {
    const initial = {
        name: '',
        email: '',
        address: ''
    }
    const [input, setInput] = useState(initial)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();
    let index = useParams()
    let id = index.id

    useEffect(() => {
        if (!state) {
            setInput(data[id])
        }
    }, [])

    function validate() {
        let error = {}
        if (input.name.length < 1) {
            error.name = 'Enter Your Name'
        }
        if (input.email.length < 1) {
            error.email = 'Enter Your Email'
        }
        if (input.address.length < 1) {
            error.address = 'Enter a Address'
        }
        return error;
    }
    const show = (e) => {
        e.preventDefault()
        const checkErrors = validate()
        if (Object.keys(checkErrors).length > 0) {
            setErrors(checkErrors)
        } else {
            setErrors({})
            setData([...data, input])
            setInput(initial)
            navigate('/User-List');
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    }
    function editData() {
        let data = JSON.parse(localStorage.getItem('users'))
        data.splice(id, 1, input)
        setData(data);
        setState(true)
        setInput(initial)
        navigate('/User-List');
    }

    return (
        <div className="container1">
            {
                state ? <h1 className='mb-3 text-white'>Add User</h1> :
                    <h1 className='mb-3 text-white'>Update Details</h1>
            }
            <div className="inputbox">
                <input type="text" name='name' value={input.name} onChange={handleChange} autoComplete="off" />
                <span>Username</span>
                <i></i>
            </div>
            <p>{errors.name}</p>
            <div className="inputbox">
                <input type="email" name='email' value={input.email} onChange={handleChange} />
                <span>Email</span>
                <i></i>
            </div>
            <p>{errors.email}</p>
            <div className="inputbox">
                <textarea name='address' value={input.address} onChange={handleChange} />
                <span>Address</span>
                <i></i>
            </div>
            <p>{errors.address}</p>
            {
                state ? <button onClick={show} >Submit</button> :
                    <button onClick={editData} >Update</button>
            }
        </div>
    )
}
