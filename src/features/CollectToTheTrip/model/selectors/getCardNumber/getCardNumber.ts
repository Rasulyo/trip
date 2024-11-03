import { StateSchema } from "../../../../../app/provider/StoreProvider/config/StateSchema";

export const getCardNumber = (state: StateSchema) => state.tripForm?.cardNumber || '';
