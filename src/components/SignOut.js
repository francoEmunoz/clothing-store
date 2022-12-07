import React from 'react';
import { Link as LinkRouter, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useSignOutMutation } from '../features/usersAPI';
import { deleteUser } from '../features/loggedSlice';
import Swal from 'sweetalert2';
// import { clear } from '../../features/cartSlice';

export default function SignOut() {
    let user = useSelector((state) => state.logged.user)
    const dispatch = useDispatch()
    const [signOut] = useSignOutMutation()
    const navigate = useNavigate()
    async function signOutfn() {
        try {
            let res = await signOut(user.id)
            if (res.data?.success) {
                dispatch(deleteUser())
                localStorage.removeItem('token')
                Swal.fire({
                    title: `Come back soon ${user.name}!`,
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    position: 'bottom-end',
                    backdrop: false,
                    toast: true,
                    timer: 3000,
                    timerProgressBar: true,
                    confirmButtonColor: '#fd2f24',
                    color: '#983275',
                })
                navigate("/", { replace: true })
            }else{
                Swal.fire({
                    title: res.data.message,
                    text: 'Do you want to continue',
                    icon: 'succes',
                    confirmButtonText: 'Cool'
                })
            }

        } catch (error) {

        }
    }
    return (
        <LinkRouter onClick={signOutfn} className='sign-out'>Log Out</LinkRouter>
    )
}
