import Swal from 'sweetalert2';

export const showSuccessAlert = (title) => {
    Swal.fire({
        title: `${title}`,
        icon: 'success',
        position: 'bottom-end',
        toast: true,
        timer: 4000,
        timerProgressBar: true,
        showConfirmButton: false,
        width: '16em',
        color: '#983275',
    });
};

export const showErrorAlert = (text) => {
    Swal.fire({
        text: `${text}`,
        icon: 'error',
        position: 'bottom-end',
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        color: '#983275',
        width: '17em'
    });
};