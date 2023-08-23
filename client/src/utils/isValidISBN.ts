export const isValidISBN10 = (isbn: string): boolean => {
    if (!/^\d{9}[\d|X]$/.test(isbn)) {
        return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += (10 - i) * parseInt(isbn[i], 10);
    }
    const check = sum % 11;
    const lastDigit = check === 10 ? 'X' : String(check);

    return isbn[9] === lastDigit;
};

export const isValidISBN13 = (isbn: string): boolean => {
    isbn.replace('-','')
    console.log(isbn)
    if (!/^\d{13}$/.test(isbn)) {
        return false;
    }

    let sum = 0;
    for (let i = 0; i < 13; i += 2) {
        sum += parseInt(isbn[i], 10);
    }
    for (let i = 1; i < 12; i += 2) {
        sum += 3 * parseInt(isbn[i], 10);
    }

    return sum % 10 === 0;
};

export const isValidISBN = (isbn: string): boolean => {
    return isValidISBN10(isbn) || isValidISBN13(isbn);
};
