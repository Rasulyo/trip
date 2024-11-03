import { configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { paymentReducer } from '../../../../features/CollectToTheTrip/model/slice/tripSlice';

export function createReduxStore(initialState?: StateSchema) {
    const store = configureStore({
        reducer: {
            tripForm: paymentReducer
        },
        devTools: true,
        preloadedState: initialState,
    });

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']

