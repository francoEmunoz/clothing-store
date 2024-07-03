import { useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../features/usersAPI";
import { useRef } from "react";
import '../styles/SignUp.css';
import { showErrorAlert, showSuccessAlert } from "../utils/alertsUtils";

export default function SignUpForm() {

    const [newUser] = useSignUpMutation();
    
    const useRefEmail = useRef();
    const useRefPassword = useRef();
    const useRefName = useRef();
    const useRefLastName = useRef();
    const useRefCountry = useRef();

    const navigate = useNavigate();

    const SignInArray = [
        { item: "Name", type: "name", value: useRefName, id: "signIn3" },
        { item: "Lastname", type: "lastName", value: useRefLastName, id: "signIn4" },
        { item: "Email", type: "email", value: useRefEmail, id: "signIn1", min: 4, max: 100 },
        { item: "Password", type: "password", value: useRefPassword, id: "signIn2", min: 3, max: 100 },
    ];

    function submitInfo(event) {
        event.preventDefault();

        const userSignUp = {
            name: useRefName.current.value,
            lastName: useRefLastName.current.value,
            country: useRefCountry.current.value,
            email: useRefEmail.current.value,
            plainPassword: useRefPassword.current.value,
            role: 'user'
        };

        newUser(userSignUp).then(response => {
            if (response.data) {
                showSuccessAlert('It has been successfully registered');
                navigate("/signin", { replace: true });
            } else {
                console.log(response.error.data.errors.Name);
                showErrorAlert(response.error.data.errors.Name);
            }
        }).catch((error) => console.log(error));
    }

    return (
        <div className='sign-in-body'>
            <form className='form-sign-up' onSubmit={submitInfo}>
                <h3>SIGN UP</h3>
                <div className='sign-in-input-container'>
                    {
                        SignInArray.map((element, index) => (
                            <div key={index} className='sign-in-input'>
                                <label htmlFor={element.item}>{element.item}</label>
                                <input type={element.type} ref={element.value} required />
                            </div>
                        ))
                    }
                    <div className='sign-in-input'>
                        <label htmlFor="country">Country</label>
                        <select ref={useRefCountry} required>
                            <option value="Argentina">Argentina</option>
                            <option value="Brasil">Brasil</option>
                            <option value="Chile">Chile</option>
                            <option value="Venezuela">Venezuela</option>
                            <option value="Uruguay">Uruguay</option>
                            <option value="Colombia">Colombia</option>
                            <option value="Paraguay">Paraguay</option>
                            <option value="Peru">Peru</option>
                        </select>
                    </div>
                    <div className='btn-login'>
                        <button className='btn-action'>Sign Up</button>
                    </div>
                </div>
            </form>
        </div>
    );
}