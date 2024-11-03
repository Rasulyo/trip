import { StateSchema } from "../../../../../app/provider/StoreProvider/config/StateSchema";

export const getErrors = (state: StateSchema) => state.tripForm?.errors || '';