import { TripFormSchema } from "../../../../features/CollectToTheTrip/model/types/TripFormSchema";

export interface StateSchema {
    tripForm: TripFormSchema;
}

export type StateSchemaKey = keyof StateSchema;