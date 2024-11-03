import { StateSchema } from "../../../../../app/provider/StoreProvider/config/StateSchema";

export const getCvc = (state: StateSchema) => state.tripForm?.cvc || '';