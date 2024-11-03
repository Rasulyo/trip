import { StateSchema } from "../../../../../app/provider/StoreProvider/config/StateSchema";

export const getAmount = (state: StateSchema) => state.tripForm?.amount || '';