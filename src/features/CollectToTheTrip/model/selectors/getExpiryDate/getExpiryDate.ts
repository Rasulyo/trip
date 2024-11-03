import { StateSchema } from "../../../../../app/provider/StoreProvider/config/StateSchema";

export const getExpiryDate = (state: StateSchema) => state.tripForm?.expiryDate || '';