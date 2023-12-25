import React from 'react';
import LoginStyle from './Login.module.css';
import { RiUserFill, RiLock2Fill } from 'react-icons/ri';
import Bg from '../../Assets/login-bg.jpg';
import { ShowAlert } from '../../Components/ShowAlert';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../Redux/authSlice';

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = (event) => {
        event.preventDefault()
        const email = event.target[0].value;
        const password = event.target[1].value;
        
        if (email === 'bharatagri' && password === '1234') {
            ShowAlert('success', 'Login Successful');
            const userData = { username: 'bharatagri' };
            dispatch(login(userData));
            return navigate('/')
        } else {
            ShowAlert('warning', 'Invalid Credentials');
        }
    };

    return (
        <div className={LoginStyle.login}>
            {/* eslint-disable-next-line */}
            <img src={Bg} alt="image" className={LoginStyle.login__bg} />

            <form onSubmit={handleSubmit} className={LoginStyle.login__form}>
                <h1 className={LoginStyle.login__title}>Login</h1>

                <div className={LoginStyle.login__inputs}>
                    <div className={LoginStyle.login__box}>
                        <input type="text" placeholder="User Name" required className={LoginStyle.login__input} />
                        <RiUserFill className={LoginStyle.icon} />
                    </div>

                    <div className={LoginStyle.login__box}>
                        <input type="password" placeholder="Password" required className={LoginStyle.login__input} />
                        <RiLock2Fill className={LoginStyle.icon} />
                    </div>
                </div>

                <button type="submit" className={LoginStyle.login__button}>
                    Login
                </button>
            </form>
        </div>
    );
};
