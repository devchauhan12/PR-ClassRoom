import React, { useState } from 'react'
import '../Assets/Review.css'

export default function Review() {
    const initial = {
        name: '',
        email: '',
        comment: '',
        rating: ''
    }
    const [input, setInput] = useState(initial)
    const [errors, setErrors] = useState({})


    const [data, setData] = useState([])
    let date = new Date();
    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();
    function validate() {
        let error = {}
        if (input.name.length < 1) {
            error.name = 'Enter Your Name'
        }
        if (input.email.length < 1) {
            error.email = 'Enter Your Email'
        }
        if (input.comment.length < 1) {
            error.comment = 'Enter a Comment'
        }
        if (input.rating.length < 1) {
            error.rating = 'Enter a Rating'
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
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    }
    return (
        <>
            <form className="container" onSubmit={show}>
                <div className="inputbox">
                    <input type="text" name='name' value={input.name} onChange={handleChange} autoComplete="off" />
                    <span>Username</span>
                    <i></i>
                </div>
                <p>{errors.name}</p>
                <div className="inputbox">
                    <input type="email" name='email' value={input.email} onChange={handleChange} autoComplete="off" />
                    <span>Email</span>
                    <i></i>
                </div>
                <p>{errors.email}</p>
                <div className="inputbox">
                    {/* <span>Rating</span> */}
                    <select name="rating" id="" value={input.rating} onChange={handleChange}>
                        <option value="">Rating</option>
                        <option value="1">Very Bad</option>
                        <option value="2">Bad</option>
                        <option value="3">Average</option>
                        <option value="4">Good</option>
                        <option value="5">Very Good</option>
                    </select>
                    <i></i>
                </div>
                <p>{errors.rating}</p>
                <div className="inputbox">
                    <textarea name='comment' value={input.comment} onChange={handleChange} />
                    <span>Comment</span>
                    <i></i>
                </div>
                <p>{errors.comment}</p>
                <button>Submit</button>
            </form>
            {
                data.map((e, i) => {
                    return (
                        <div key={i} className="box">
                            <div className="rImg">
                                <img src="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png" />
                            </div>
                            <div className="reviewer">
                                <h2>{e.name}<p className="reviewdate">{d < 9 ? '0' + d : d} / {m < 9 ? '0' + m : m} / {y}</p></h2>
                                <p className="mb-1">{e.email}
                                </p>
                                <p>{Array.from(Array(+e.rating).keys()).map((r, i) => {
                                    return <React.Fragment key={i} >⭐</React.Fragment>
                                })}</p>
                            </div>
                            <p className="review">{e.comment}</p>
                        </div >
                    )
                })
            }
        </>
    )
}
