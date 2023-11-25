import React, { useState } from 'react'
import '../Assets/Event.css'

export default function Event() {
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [data, setData] = useState([])
    const show = (e) => {
        e.preventDefault()
        setData([...data, { No: data.length + 1, Name: name, Email: email }])
        setName(null)
        setEmail(null)
        e.target[0].value = ""
        e.target[1].value = ""
    }
    const Value = (e) => {
        if (e.target.name === "Name") {
            setName(e.target.value)
        } else {
            setEmail(e.target.value)
        }
    }
    return (
        <>
            <form className="container" onSubmit={(e) => show(e)}>
                <div className="inputbox">
                    <input type="text" name='Name' onChange={(e) => Value(e)} required={name === null || name === ""} />
                    <span>Username</span>
                    <i></i>
                </div>
                <div className="inputbox">
                    <input type="email" name='Email' onChange={(e) => Value(e)} required={email === null || email === ""} />
                    <span>Email</span>
                    <i></i>
                </div>
                <button>Log in</button>
            </form>
            <table>
                <tbody>
                    <tr>
                        <th> No. </th>
                        <th> Name </th>
                        <th> Email </th>
                    </tr>
                    {
                        data.map((e, i) => {
                            return (
                                <tr key={i}>
                                    <td>0{e.No}.</td>
                                    <td>{e.Name}</td>
                                    <td>{e.Email}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table >
        </>
    )
}
