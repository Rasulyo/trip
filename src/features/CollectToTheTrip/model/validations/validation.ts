export interface FormData {
    cardNumber: string;
    expiryDate: string;
    cvc: string;
    amount: number | string;
    name: string;
    message?: string;
  }
  
  export function validatePaymentData(data: FormData): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!data.cardNumber) {
        errors.cardNumber = 'Пожалуйста, введите номер карты';
    } else if (!isValidCardNumber(data.cardNumber)) {
        errors.cardNumber = 'Неверный номер карты';
    }

    if (!data.expiryDate) {
        errors.expiryDate = 'Пожалуйста, введите дату истечения';
    }

    if (!data.cvc) {
        errors.cvc = 'Пожалуйста, введите CVV';
    } else if (data.cvc.length !== 3) {
        errors.cvc = 'CVC должен содержать 3 цифры';
    }

    if (!data.amount) {
        errors.amount = 'Сумма должна быть не менее 10';
    }

    if (!data.name) {
        errors.name = 'Пожалуйста, введите ваше имя';
    }

    return errors;
}


function isValidCardNumber(cardNumber: string) {
    let s = 0;
    let doubleDigit = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = +cardNumber[i];
        if (doubleDigit) {
            digit *= 2;
            if (digit > 9)
                digit -= 9;
        }
        s += digit;
        doubleDigit = !doubleDigit;
    }
    return s % 10 == 0;
}