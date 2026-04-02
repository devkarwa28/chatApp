import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, Lock } from 'lucide-react'
import loginStyles from './login.module.css'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

const Register = () => {
    const API = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        uname: "",
        email: "",
        phone: "",
        password: "",
    })
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setError("")
        try {
            setLoading(true)
            const { data } = await axios.post(`${API}/auth/register`, formData);
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/chat");
        }
        catch (err) {
            setError(err.response?.data?.message || "Registration Failed. Please try again.")
        }
        finally {
            setLoading(false)
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
                        <h1>Create <span>Account</span></h1>
                        <p className={loginStyles.subtitle}>Join MyChat today and start connecting with friends.</p>
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
                            <User className={loginStyles.inputIcon} size={20} />
                            <input 
                                type="text" 
                                placeholder='Username' 
                                name='uname' 
                                value={formData.uname} 
                                onChange={changeHandler}
                                required
                            />
                        </div>
                    </div>

                    <div className={loginStyles.inputGroup}>
                        <div className={loginStyles.inputWrapper}>
                            <Mail className={loginStyles.inputIcon} size={20} />
                            <input 
                                type="email" 
                                placeholder='Email address' 
                                name='email' 
                                value={formData.email} 
                                onChange={changeHandler}
                                required
                            />
                        </div>
                    </div>

                    <div className={loginStyles.inputGroup}>
                        <div className={loginStyles.inputWrapper}>
                            <Phone className={loginStyles.inputIcon} size={20} />
                            <input 
                                type="text" 
                                placeholder='Phone number' 
                                name='phone' 
                                value={formData.phone}
                                onChange={changeHandler}
                                required
                            />
                        </div>
                    </div>

                    <div className={loginStyles.inputGroup}>
                        <div className={loginStyles.inputWrapper}>
                            <Lock className={loginStyles.inputIcon} size={20} />
                            <input 
                                type="password" 
                                placeholder='Password' 
                                name='password' 
                                value={formData.password} 
                                onChange={changeHandler}
                                required
                            />
                        </div>
                    </div>

                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type='submit' 
                        disabled={loading}
                    >
                        {loading ? "Creating account..." : "Register Now"}
                    </motion.button>

                    <div className={loginStyles.or_divider}>
                        <span>OR</span>
                    </div>

                    <p className={loginStyles.footerText}>
                        Already have an account? <NavLink to="/login">Sign In</NavLink>
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

export default Register