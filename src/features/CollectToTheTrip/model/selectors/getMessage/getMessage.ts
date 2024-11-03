import { StateSchema } from "../../../../../app/provider/StoreProvider/config/StateSchema";

export const getMessage = (state: StateSchema) => state.tripForm?.message || '';
