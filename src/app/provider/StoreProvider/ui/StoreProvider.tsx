import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ReducersMapObject } from 'redux';
import { createReduxStore } from '../config/store';
import { StateSchema } from '../config/StateSchema';

interface StoreProviderProps {
  children?: ReactNode;
  initialState?: DeepPartial<StateSchema>;
  AsyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

export const StoreProvider = (props: StoreProviderProps) => {
    const { children, initialState } = props;

    const store = createReduxStore(
        initialState as StateSchema,
    );

    return <Provider store={store}>{children}</Provider>;
};
