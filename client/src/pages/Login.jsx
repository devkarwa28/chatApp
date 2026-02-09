import React, { useState } from 'react'
import loginStyles from './login.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Login = () => {
    const API = process.env.API;
    const navigate = useNavigate();
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);
    const [formdata,setFormdata] = useState({
        email: "",
        password: "",
    });

    const changeHandler =  (e) =>{
        setFormdata({...formdata,[e.target.name]: e.target.value});
    }
    const submitHandler = async (e) =>{
        e.preventDefault();
        setLoading(true);
        try{
            const res = await axios.post(`${API}/auth/login`, formdata)
        localStorage.setItem("userInfo",JSON.stringify(res.data));
        navigate("/chat");
        }
        catch(err){
            setError(err.response?.data?.message || "Login Failed")
        }
        finally{
            setLoading(false);
        }
    }

  return (
    <>
    <section className={loginStyles.login}>
        <div className='formBox' style={{flex:1, display:"flex" ,alignItems: 'center'}}>
            <form onSubmit={submitHandler}>
            <h1>Login To <span>MyChat</span></h1>
            <input type="email" name="email" onChange={changeHandler} placeholder='Email' value={formdata.email} />
            <input type="password" name="password" onChange={changeHandler} placeholder='Password' value={formdata.password}/>
            <button type="submit" disabled={loading}>
                {loading ? "Logging In" : "Login"}
            </button>
            <div className={loginStyles.or_divider}>
                  <span>OR</span>
            </div>
            <div>
                <h6 className='text-center'>Dont Have Account <NavLink to="/register">Register Now</NavLink></h6>
            </div>
            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </form>
        </div>
        <footer className={loginStyles.credits}>
            <h2>Designed & Developed By <span>Dev Karwa</span></h2>
        </footer>
    </section>
    </>
  )
}

export default Login