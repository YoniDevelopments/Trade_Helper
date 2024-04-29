'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactElement, ReactNode } from 'react';

interface NextAuthProviderProps {
    children: ReactElement;
}

export default function AuthProvider(props: NextAuthProviderProps) {

    const { children } = props;

    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}