import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { authentication } from "./layout";
function SignInForm() {

  const { logedUser, setLogedUser } = useContext(authentication)
  const navigate = useNavigate()
  const { login, setLogin } = useContext(authentication)
  const initial = {
    email: '',
    password: '',
  }
  const [input, setInput] = useState(initial)
  const [errors, setErrors] = useState({})
  const check = async (input) => {
    const users = await GetData()
    return users.filter((item) => {
      if (item.email === input.email) {
        if (item.password === input.password) {
          setLogedUser(item);
          axios.put('http://localhost:3001/LoggedIn', item);
          return item
        }
      }
    })
  }
  const GetData = async () => {
    const users = await axios.get('http://localhost:3001/users')
      .then(function (response) {
        return response.data
      })
    return users
  }
  function validate() {
    let error = {}
    if (input.email.length < 1) {
      error.email = 'Enter Your Email'
    }
    if (input.password.length < 1) {
      error.password = 'Enter Your Password'
    }
    return error;
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const checkErrors = validate()
    if (Object.keys(checkErrors).length > 0) {
      setErrors(checkErrors)
    } else {
      const found = await check(input);
      if (found.length != 0) {
        setErrors({})
        setInput(initial)
        setLogin(true)
        navigate("/products")
      } else {
        setErrors({ password: "Enter correct Email and Password." })
      }
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  }

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
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
        <span>or use your account</span>
        <input type="email" placeholder="Email" name="email" value={input.email} onChange={handleChange} />
        <p className="m-0">{errors.email}</p>
        <input type="password" name="password" placeholder="Password" value={input.password} onChange={handleChange} />
        <p className="m-0">{errors.password}</p>

        <p>Forgot your password?</p>
        <button className="mt-2">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
