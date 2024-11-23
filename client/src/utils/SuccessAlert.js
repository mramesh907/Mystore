import Swal from 'sweetalert2'
const SuccessAlert = (message) => {
   const SweetAlert = Swal.fire({
      title: message,
      text: 'You added the product successfully',
      icon: 'success',
    });
    return SweetAlert
}

export default SuccessAlert