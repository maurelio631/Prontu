import Swal from "sweetalert2";

export const confirmAlert = (msg, confirmButtonText, cancelButtonText, onConfirm, onDeny) => {
     Swal.fire({
        title: msg,
        confirmButtonText: confirmButtonText,
        showDenyButton: true,
        denyButtonText: cancelButtonText
    }).then((result) => {
        if (result.isConfirmed) {
            if (typeof onConfirm === "function") {
                onConfirm();
            }
        } else if (result.isDenied) {
            if (typeof onDeny === "function") {
                onDeny();
            }
        }
    });
}


export const toastErrorAlert = (msg) => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: "error",
        title: msg
    });
}
export const toastSuccessAlert = (msg) => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1900,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: "success",
        title: msg
    });
}