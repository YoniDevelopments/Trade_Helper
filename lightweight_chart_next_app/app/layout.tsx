import ReduxProvider from '@/redux/reduxProvider';
import AuthProvider from '@/utils/auth/authProvider';
import MainGrid from '@/utils/common/components/mainGrid';
import Theme from '@/utils/theme/themeProvider';
//import '../styles/globals.css';
import '../app/globals.css';
import '../app/common.css'
 
export const metadata = {
    title: 'Trade Helper App',
    description: 'A small application to View Stock Charts and to create price alerts.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <AuthProvider>
                <ReduxProvider>
                <Theme>
                    <body>
                        <MainGrid>
                            {children}
                        </MainGrid>
                    </body>
                </Theme>
                </ReduxProvider>
            </AuthProvider>
        </html>
    )
}
