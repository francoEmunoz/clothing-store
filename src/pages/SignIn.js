import React, { useRef } from 'react';
import { useSignInMutation } from '../features/userAPI';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/loggedSlice';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Link as LinkRouter } from "react-router-dom";
import '../styles/SignIn.css';

export default function SignIn() {

    const [signInUser] = useSignInMutation()
    const dispatch = useDispatch()
    const useRefEmail = useRef()
    const useRefPassword = useRef()
    const navigate = useNavigate()
    const SignInArray = [
        { item: "Email", type: "email", value: useRefEmail, id: "signIn1", min: 4, max: 100 },
        { item: "Password", type: "password", value: useRefPassword, id: "signIn2", min: 3, max: 100 },
    ]
    function submitInfo(text) {
        text.preventDefault();

        const userSignIn = {
            mail: useRefEmail.current.value,
            password: useRefPassword.current.value,
            role: 'user',
            from: 'form'
        }
        signInUser(userSignIn).then(response => {
            if (response.data?.success) {
                dispatch(setUser(response.data.response.user))
                localStorage.setItem('token', response.data.response.token)
                Swal.fire({
                    title: 'Error!',
                    text: 'Do you want to continue',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
                navigate("/", { replace: true })
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Do you want to continue',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
            }
        }).catch((error) => console.log(error))
    }
    return (
        <div className='sign-in-body'>
            <form className='form' onSubmit={submitInfo}>
                <h3>LOG IN</h3>
                <div className='sign-in-input-container'>
                    {
                        SignInArray.map((element) => {
                            return (
                                <div className='sign-in-input'>
                                    <label htmlFor={element.item} > {element.item} </label>
                                    <input type={element.type} ref={element.value} required placeholder='|' />
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
