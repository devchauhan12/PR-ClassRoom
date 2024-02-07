import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { authentication } from "./layout";
function SignUpForm() {

  const navigate = useNavigate()

  const { users, setUsers } = useContext(authentication)
  const { login, setLogin } = useContext(authentication)
  const { logedUser, setLogedUser } = useContext(authentication)


  const initial = {
    name: '',
    email: '',
    password: '',
  }
  const [input, setInput] = useState(initial)
  const [errors, setErrors] = useState({})
  const [userError, setUserError] = useState()

  function validate() {
    let error = {}
    if (input.name.length < 1) {
      error.name = 'Enter Your Name'
    }
    if (input.email.length < 1) {
      error.email = 'Enter Your Email'
    }
    if (input.password.length < 6) {
      error.password = 'Enter Password of 6 digits or long'
    }
    return error;
  }

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    await axios.get("http://localhost:3001/users")
      .then((resp) => resp.data)
      .then((json) => setUsers(json))
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    const checkErrors = validate()

    if (Object.keys(checkErrors).length > 0) {
      setErrors(checkErrors)
    } else {
      const existUser = users.some((existingUser) => existingUser.email === input.email)
      if (existUser) {
        setUserError('Account already exists.')
      } else {
        let newuser = {
          name: input.name,
          email: input.email,
          password: input.password,
          cart: []
        }
        let done = await axios.post("http://localhost:3001/users", newuser).then(() => { getData() })
        console.log(done)
        setLogedUser(done)
        setErrors({})
        setUserError('')
        setInput(initial)
        // setLogedUser({
        //   name: input.name,
        //   email: input.email,
        //   password: input.password,
        //   cart: []
        // })
        setLogin(true)
        axios.put('http://localhost:3001/LoggedIn', {
          name: input.name,
          email: input.email,
          password: input.password,
          cart: []
        });
        navigate("/products")
      }
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  }
  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <p className="m-0">{userError}</p>
        <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
        <span>or use your email for registration</span>
        <input type="text" name="name" value={input.name} onChange={handleChange} placeholder="Name" />
        <p className="m-0">{errors.name}</p>
        <input type="email" name="email" value={input.email} onChange={handleChange} placeholder="Email" />
        <p className="m-0">{errors.email}</p>
        <input type="password" name="password" value={input.password} onChange={handleChange} placeholder="Password" />
        <p className="m-0">{errors.password}</p>
        <button className="mt-2">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
