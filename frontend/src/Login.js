import React, { useState } from 'react'
import './components/LoginSignup/LoginSignup.css'
import { Link } from 'react-router-dom'
import Validation  from './LoginValidation';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import planner from '/Users/ceydatopcu/Desktop/4YearPlans/frontend/src/components/_dreamwitch666-removebg-preview.png'
import computer from '/Users/ceydatopcu/Desktop/4YearPlans/frontend/src/components/computer.png'

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    const[errors, setErrors] = useState({})
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        if(errors.email ===  "" &&  errors.password === ""){
            axios.post('http://localhost:8083/login', values)
            .then(res => {
                if(res.data === "Success"){
                    navigate('/plan')
                } else {
                    alert("No record existed");
                }
            })
            .catch(err => console.log(err));
        }
    }
    return(
        <div className = 'container'>
            <div>
                <hr></hr>
                <img src={planner} width="300px" height="300px"/>
                <img src={computer} width="250px" height="250px"/>
                <h2 id="Welcome">Welcome to FourEvYear</h2>
            </div>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Log In</h2>
                <form action="" onSubmit={handleSubmit}>
                <div className = 'header'>
                    <label className='text' htmlFor="email"><strong>Email</strong></label>
                    <input type = "email" placeholder='Enter Email' name='email'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                </div>

                <div className = 'header'>
                    <label className='text' htmlFor="password"><strong>Password</strong></label>
                    <input type = "text" placeholder='Enter Password' name='password'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.password && <span className='text-danger'>{errors.password}</span>}
                </div>
                <button type='submit' className = 'btn btn-success w-100 rounded-0'>Log In</button>
                <p>Terms and Policies</p>
                <Link to = "/signup" className = 'btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
                </form>
            </div>
        </div>
    )
}

export default Login