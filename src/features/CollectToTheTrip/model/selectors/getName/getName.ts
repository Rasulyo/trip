import { StateSchema } from "../../../../../app/provider/StoreProvider/config/StateSchema";

export const getName = (state: StateSchema) => state.tripForm?.name || '';
