export function formatPhone(value) {
    // Remove todos os caracteres não numéricos
    const cleanedValue = value.replace(/\D/g, '');

    // Formata o número de telefone
    let formattedValue = '';
    if (cleanedValue.length <= 2) {
        formattedValue = cleanedValue;
    } else if (cleanedValue.length <= 5) {
        formattedValue = `(${cleanedValue.slice(0, 2)}) ${cleanedValue.slice(2)}`;
    } else {
        formattedValue = `(${cleanedValue.slice(0, 2)}) ${cleanedValue.slice(2, 5)}${cleanedValue.slice(5)}`;
    }

    return formattedValue;
}

export function formatDate(value) {
    // Remove todos os caracteres não numéricos
    const cleanedValue = value.replace(/\D/g, '');

    // Formata a data
    let formattedValue = '';
    if (cleanedValue.length <= 2) {
        formattedValue = cleanedValue;
    } else if (cleanedValue.length <= 4) {
        formattedValue = `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2)}`;
    } else {
        formattedValue = `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2, 4)}/${cleanedValue.slice(4)}`;
    }

    return formattedValue;
}

export function formatCPF(value) {
    // Remove todos os caracteres não numéricos
    const cleanedValue = value.replace(/\D/g, '');

    // Formata o CPF
    let formattedValue = '';
    if (cleanedValue.length <= 3) {
        formattedValue = cleanedValue;
    } else if (cleanedValue.length <= 6) {
        formattedValue = `${cleanedValue.slice(0, 3)}.${cleanedValue.slice(3)}`;
    } else if (cleanedValue.length <= 9) {
        formattedValue = `${cleanedValue.slice(0, 3)}.${cleanedValue.slice(3, 6)}.${cleanedValue.slice(6)}`;
    } else {
        formattedValue = `${cleanedValue.slice(0, 3)}.${cleanedValue.slice(3, 6)}.${cleanedValue.slice(6, 9)}-${cleanedValue.slice(9)}`;
    }

    return formattedValue;
}
