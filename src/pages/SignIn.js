import React, { useRef } from 'react';
import { useSignInMutation } from '../features/usersAPI';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from '../features/loggedSlice';
import { useNavigate, useLocation  } from "react-router-dom";
import { Link as LinkRouter } from "react-router-dom";
import '../styles/SignIn.css';
import { showErrorAlert, showSuccessAlert } from '../utils/alertsUtils';

export default function SignIn() {

    const [signInUser] = useSignInMutation()
    const dispatch = useDispatch()
    const useRefEmail = useRef()
    const useRefPassword = useRef()

    const location = useLocation();
    const navigate = useNavigate()

    const SignInArray = [
        { item: "Email", type: "email", value: useRefEmail, id: "signIn1", min: 4, max: 100 },
        { item: "Password", type: "password", value: useRefPassword, id: "signIn2", min: 3, max: 100 },
    ]

    function submitInfo(text) {
        text.preventDefault();

        const userSignIn = {
            email: useRefEmail.current.value,
            plainPassword: useRefPassword.current.value,
            role: 'user'
        }
        signInUser(userSignIn).then(response => {
            if (response.data) {
                dispatch(setToken(response.data.token))
                dispatch(setUser(response.data.user))
                localStorage.setItem('token', response.data.token)

                showSuccessAlert('Welcome '+ response.data.user.name);
                
                const returnTo = new URLSearchParams(location.search).get('returnTo') || '/';
                navigate(returnTo, { replace: true });
            } else {
                showErrorAlert('Invalid credentials');
            }
        }).catch((error) => console.log(error))
    }

    return (
        <div className='sign-in-body'>
            <form className='form' onSubmit={submitInfo}>
                <h3>LOG IN</h3>
                <div className='sign-in-input-container'>
                    {
                        SignInArray.map((element, index) => {
                            return (
                                <div key={index} className='sign-in-input'>
                                    <label htmlFor={element.item} > {element.item} </label>
                                    <input type={element.type} ref={element.value} />
                                </div>
                            )
                        })
                    }
                    <div className='btn-login'>
                        <button className='btn-action'>Login</button>
                    </div>
                    <div className='go-signup'>
                        <LinkRouter to="/signup"><p>Sign Up</p></LinkRouter>
                    </div>
                </div>
            </form>
        </div>
    )
}
