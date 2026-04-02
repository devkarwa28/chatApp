import React, { useState } from 'react'
import { motion } from 'framer-motion'
import loginStyles from './login.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Login = () => {
    const API = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [formdata, setFormdata] = useState({
        email: "",
        password: "",
    });

    const changeHandler = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await axios.post(`${API}/auth/login`, formdata)
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            navigate("/chat");
        }
        catch (err) {
            setError(err.response?.data?.message || "Login Failed. Please check your credentials.")
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <section className={loginStyles.login}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={loginStyles.formContainer}
            >
                <form onSubmit={submitHandler}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1>Login to <span>MyChat</span></h1>
                        <p className={loginStyles.subtitle}>Welcome back! Please enter your details.</p>
                    </motion.div>

                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={loginStyles.errorMsg}
                        >
                            {error}
                        </motion.div>
                    )}

                    <div className={loginStyles.inputGroup}>
                        <div className={loginStyles.inputWrapper}>
                            <Mail className={loginStyles.inputIcon} size={20} />
                            <input 
                                type="email" 
                                name="email" 
                                onChange={changeHandler} 
                                placeholder='Email address' 
                                value={formdata.email} 
                                required
                            />
                        </div>
                    </div>

                    <div className={loginStyles.inputGroup}>
                        <div className={loginStyles.inputWrapper}>
                            <Lock className={loginStyles.inputIcon} size={20} />
                            <input 
                                type="password" 
                                name="password" 
                                onChange={changeHandler} 
                                placeholder='Password' 
                                value={formdata.password}
                                required
                            />
                        </div>
                    </div>

                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit" 
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </motion.button>

                    <div className={loginStyles.or_divider}>
                        <span>OR</span>
                    </div>

                    <p className={loginStyles.footerText}>
                        Don't have an account? <NavLink to="/register">Create one now</NavLink>
                    </p>
                </form>
            </motion.div>

            <motion.footer 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className={loginStyles.credits}
            >
                <h2>Designed & Developed By <span>Dev Karwa</span></h2>
            </motion.footer>
        </section>
    )
}

export default Login
