import { StateSchema } from "src/app/provider/StoreProvider/config/StateSchema";

export const getCollect = (state: StateSchema) => state.tripForm || null;