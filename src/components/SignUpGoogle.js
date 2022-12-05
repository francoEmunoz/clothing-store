import { useEffect, useRef } from "react";
import * as jose from "jose";
import { useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../features/usersAPI";
import Swal from 'sweetalert2';

export default function SignUpGoogle() {
  const navigate = useNavigate();
  const buttonDiv = useRef(null);
  let [newUser] = useSignUpMutation();

  async function handleCredentialResponse(response) {
    let userObject = jose.decodeJwt(response.credential);
    let data = {
      name: userObject.name,
      lastName: userObject.family_name,
      mail: userObject.email,
      password: userObject.sub,
      country: "Country",
      role: "user",
      from: "google",
    };
    newUser(data).then(response => {
      if (response.data?.success) {
        Swal.fire({
          title: "It has been successfully registered",
          icon: 'success',
          confirmButtonText: 'Cool'
      });
        navigate("/signin", { replace: true })
      } else {
        Swal.fire({
          title: 'Error!',
          text: response.data.message,
          icon: 'error',
          confirmButtonText: 'Cool'
      })
        if (response.error) {
          Swal.fire({
            title: 'Error!',
            text: response.data.message,
            icon: 'error',
            confirmButtonText: 'Cool'
        })
        }
        navigate("/signin", { replace: true })
      }
    }).catch(error => {
      console.log(error)
    }
    );
  }

  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id: "436856608552-m4j1fcdleff8h88eitnemequcevgtprn.apps.googleusercontent.com",
      callback: handleCredentialResponse,
      context: "signup",
    });
    google.accounts.id.renderButton(
      buttonDiv.current,
      { theme: "outline", size: "medium", text: "signup_with", locale: "en" }
    );
  }, []);
  return (
    <div>
      <div ref={buttonDiv}></div>
    </div>
  );
}
