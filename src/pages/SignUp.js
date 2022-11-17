import { useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../features/userAPI";
import { useRef } from "react";
import Swal from 'sweetalert2';

function Input({ label, name, type }) {
    return (
        <div className='signUp-input'>
            <label>
                {label}
                <input name={name} type={type} required />
            </label>
        </div>
    );
}

export default function SignUpForm() {
    const navigate = useNavigate();
    const form = useRef();
    const [newUser] = useSignUpMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(form.current);
        const formUser = {
            name: formData.get("name"),
            lastName: formData.get("lastname"),
            mail: formData.get("mail"),
            country: formData.get("country"),
            password: formData.get("password"),
            from: "form",
            role: "user"
        };
        newUser(formUser).then(response => {
            if (response.data?.success) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Do you want to continue',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                  })
                navigate("/signin", { replace: true })
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Do you want to continue',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
                navigate("/signin", { replace: true })
            }
        }).catch(error => console.log(error));

        form.current.reset();
    };

    return (
        <div className='sign-up-page'>
            <div className='signUp-img'>
                <img src="https://i.im.ge/2022/10/05/1kKVu1.SignInCanabbis.png" alt="signiage" />
            </div>
            <form ref={form} className='Form-signup' onSubmit={handleSubmit}>
                <div className='signInInputContainer'>
                    <Input label="Name" name="name" />
                    <Input label="Last Name" name="lastname" />
                    <Input label="Mail" name="mail" />
                    <Input label="Country" name="country" />
                    <Input label="Photo URL" name="photo" />
                    <Input label="Password" name="password" type="password" />
                </div>
                <div className='Form-user-signup'>
                    <button type="submit" >
                        Sign Up!
                    </button>
                </div>
            </form>
        </div>
    );
}