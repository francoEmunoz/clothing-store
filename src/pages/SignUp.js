import { useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../features/usersAPI";
import { useRef } from "react";
import Swal from 'sweetalert2';
import SignUpGoogle from "../components/SignUpGoogle";
import '../styles/SignUp.css';

export default function SignUpForm() {

    const [newUser] = useSignUpMutation();
    const useRefEmail = useRef()
    const useRefPassword = useRef()
    const useRefName = useRef()
    const useRefLastName = useRef()
    const useRefCountry = useRef()
    const navigate = useNavigate()
    const SignInArray = [
        { item: "Name", type: "name", value: useRefName, id: "signIn3" },
        { item: "Lastname", type: "lastName", value: useRefLastName, id: "signIn4" },
        { item: "Country", type: "country", value: useRefCountry, id: "signIn5" },
        { item: "Email", type: "email", value: useRefEmail, id: "signIn1", min: 4, max: 100 },
        { item: "Password", type: "password", value: useRefPassword, id: "signIn2", min: 3, max: 100 },
    ]
    function submitInfo(text) {
        text.preventDefault();

        const userSignUp = {
            name: useRefName.current.value,
            lastName: useRefLastName.current.value,
            country: useRefCountry.current.value,
            mail: useRefEmail.current.value,
            password: useRefPassword.current.value,
            role: 'user',
            from: 'form'
        }
        newUser(userSignUp).then(response => {
            if (response.data?.success) {
                Swal.fire({
                    title: "It has been successfully registered",
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    position: 'bottom-end',
                    backdrop: false,
                    toast: true,
                    timer: 3000,
                    timerProgressBar: true,
                    confirmButtonColor: '#fd2f24',
                    width: '16em',
                    color: '#983275',
                })
                navigate("/signin", { replace: true })
            } else {
                Swal.fire({
                    title: response.data.message,
                    icon: 'error',
                    confirmButtonText: 'Ok',
                    position: 'bottom-end',
                    backdrop: false,
                    toast: true,
                    timer: 3000,
                    timerProgressBar: true,
                    confirmButtonColor: '#fd2f24',
                    color: '#983275',
                })
            }
        }).catch((error) => console.log(error))
    }
    return (
        <div className='sign-in-body'>
            <form className='form-sign-up' onSubmit={submitInfo}>
                <h3>SIGN UP</h3>
                <SignUpGoogle />
                <div className='sign-in-input-container'>
                    {
                        SignInArray.map((element) => {
                            return (
                                <div className='sign-in-input'>
                                    <label htmlFor={element.item} > {element.item} </label>
                                    <input type={element.type} ref={element.value} />
                                </div>
                            )
                        })
                    }
                    <div className='btn-login'>
                        <button className='btn-action'>Sign Up</button>
                    </div>
                </div>
            </form>
        </div>
    )
}