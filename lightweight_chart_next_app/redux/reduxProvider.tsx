'use client';

import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

interface ReduxProviderProps {
    children: ReactElement;
}

export default function ReduxProvider(props: ReduxProviderProps) {

    const { children } = props;

    return (
        <Provider store={ store }>
            {children}
        </Provider>
    );
}