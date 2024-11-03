import { FormData } from "../validations/validation";

export interface TripFormSchema {
    cardNumber: string;
    expiryDate?: ExpiryDate;
    cvc: string;
    amount: number;
    name: string;
    message: string;
    isLoading?: boolean;
    errors?: FormData;
}

export type ExpiryDate = `${number}${number} / ${number}${number}` | '';
