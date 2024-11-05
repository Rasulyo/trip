import SHA256 from "crypto-js/sha256";
import encHex from "crypto-js/enc-hex";

import { FormData, validatePaymentData } from "../../validations/validation";

export const sendPaymentData = async (
    data: FormData,
    onSuccess: () => void,
    onFail: (errors: unknown) => void
  ) => {
    const apiKey = "316b2be8-3475-4462-bd57-c7794d4bdb53";
    const secret = "1234567890";
    const transaction = Date.now().toString();
    const errors = validatePaymentData(data);
  
    if (Object.keys(errors).length > 0) {
      onFail(errors);
      throw new Error('Validation failed');
    }
  
    try {
      const amount = data.amount;
      const hash_sum = SHA256(`${apiKey}${transaction}${Number(amount) * 100}${secret}`).toString(encHex);
  
      const payload = {
        api_key: apiKey,
        transaction,
        description: "Оплата экскурсии",
        amount,
        hash_sum,
        custom_data: data
      };
  
      const response = await fetch("https://example/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
  
      if (!response.ok) {
        throw new Error(`Failed to send payment data to API: ${response.statusText}`);
      }
  
      const result = await response.json();
      onSuccess();
      return result;
    } catch (error) {
      console.error("Error during payment submission:", error);
      onFail({ general: "Payment submission failed. Please try again later." });
    }
  };