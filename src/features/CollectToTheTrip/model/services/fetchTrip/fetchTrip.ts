import { AppDispatch } from "../../../../../app/provider/StoreProvider/config/store";
import { paymentActions } from "../../slice/tripSlice";
import { FormData, validatePaymentData } from "../../validations/validation";
import SHA256 from "crypto-js/sha256";
import encHex from "crypto-js/enc-hex";

export const sendPaymentData = async (data: FormData, dispatch: AppDispatch) => {
    const apiKey = "316b2be8-3475-4462-bd57-c7794d4bdb53";
    const secret = "1234567890";
    const transaction = Date.now().toString();
    const errors = validatePaymentData(data);

    if (Object.entries(errors).length) {
        dispatch(paymentActions.setErrors(errors));
        throw new Error('Validation failed');
    }

    const amount = data.amount;
    const hash_sum = SHA256(`${apiKey}${transaction}${Number(amount) * 100}${secret}`).toString(encHex);

    const payload = {
        api_key: apiKey,
        transaction,
        description: "Оплата экскурсии",
        amount,
        hash_sum,
        custom_data: {
            initiator: "Иван.К",
            trip: "Экскурсия",
            ...data
        },
    };

    console.log("Simulating API call with payload:", payload);

    return payload;
};
