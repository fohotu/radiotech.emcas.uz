import Swal from 'sweetalert2';

export const swalSuccess = (message = 'Operation successful!') => {
    return Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    });
};

export const swalError = (message = 'Something went wrong!') => {
    return Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: message,
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
    });
};



export const swalConfirm = async (title = 'Вы уверены?', text = 'Это действие нельзя будет отменить!') => {
    const result = await Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Да, удалить!',
        cancelButtonText: 'Отмена',
    });

    return result.isConfirmed;
};


