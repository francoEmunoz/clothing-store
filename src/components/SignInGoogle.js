import React, { useRef, useEffect } from 'react';
import * as jose from 'jose';
import { useSignInMutation } from '../features/usersAPI';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/loggedSlice';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export default function SignInGoogle() {
    const navigate = useNavigate()
    const [signIn] = useSignInMutation()
    const buttonDiv = useRef(null)
    const dispatch = useDispatch()
    async function handleCredentialResponse(response) {

        let userObject = jose.decodeJwt(response.credential)
        let data = {
            mail: userObject.email,
            password: userObject.sub,
            from: 'google'
        }
        signIn(data)
            .then(response => {
                if (response.data?.success) {
                    localStorage.setItem('token', response.data.response.token);
                    dispatch(setUser(response.data.response.user));
                    Swal.fire({
                        title: "Welcome " + response.data.response.user.name,
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                    navigate("/", { replace: true })
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: `${response.error.data.message}`,
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    })
                }
            })
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        /*  global google */
        google.accounts.id.initialize({
            client_id: '436856608552-m4j1fcdleff8h88eitnemequcevgtprn.apps.googleusercontent.com',
            callback: handleCredentialResponse,
            context: 'signin'
        });
        google.accounts.id.renderButton(
            buttonDiv.current,
            { theme: "outline", size: "medium", text: 'signin_with', locale: "en" }
        )
    }, [])

    return (
        <div ref={buttonDiv}></div>
    )
}