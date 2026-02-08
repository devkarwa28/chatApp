import React, { useState } from 'react'
import registerStyles from './login.module.css'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    uname: "",
    email: "",
    phone: "",
    password: "",
  })
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false)

  const changeHandler = (e) =>{
    setFormData({...formData,[e.target.name]: e.target.value});
  }

  const submitHandler = async (e) =>{
    e.preventDefault();
    setError("")
    try{
      setLoading(true)
      const {data} = await axios.post("http://localhost:5000/api/auth/register",formData);
      localStorage.setItem("userInfo",JSON.stringify(data));
      navigate("/chat");
    }
    catch(err){
      setError(err.response?.data?.message || "Registration Failed")
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <section className={registerStyles.login}>
      <div style={{flex:1, display:"flex" ,alignItems: 'center'}}>
         <form onSubmit={submitHandler}>
        <h1>Register On <span>MyChat</span></h1>
        {error && <p style={{color: 'red'}}>{error}</p>}
        <input type="text" placeholder='Enter Your Username' name='uname' value={formData.uname} onChange={changeHandler}/>
        <input type="text" placeholder='Enter Your Email' name='email' value={formData.email} onChange={changeHandler} />
        <input type="text" placeholder='Enter Your Mobile' name='phone' value={formData.phone}onChange={changeHandler} />
        <input type="text" placeholder='Enter New Password' name='password' value={formData.password} onChange={changeHandler}/>
        <div style={{display:'flex',justifyContent:'end'}}>
          <button type='submit' disabled={loading}>
            {loading ? "Registering" : "Register"}
          </button>
        </div>
        <p style={{textAlign:'center',marginTop:'24px'}}>
          Already have a Account ? <NavLink to="/login">Login</NavLink>
        </p>
      </form>
      </div>
      <footer className={registerStyles.credits}>
                  <h2>Designed & Developed By <span>Dev Karwa</span></h2>
      </footer>
    </section>
  )
}

export default Register