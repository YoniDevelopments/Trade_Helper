'use strict';

import { Box, Button, Grid, Typography, Card, CardContent, Snackbar, Alert } from '@/utils/theme/muiLib'; 
import SessionCheckComponent from '@/utils/common/components/sessionCheckComponent';
import { FeatureConfig } from '@/feature_config/featureConfig';
import { useState, useEffect, useCallback } from 'react'; 
import { getServerSession } from 'next-auth/next';
import { asgardeoProviderOptions } from '@/utils/auth/authOptions'; // Make sure this path is correct
import { useSession } from 'next-auth/react';

interface AlertEntry { 
    id: string;
    symbol: string;
    price: number;
}

interface ViewAlertsProps {
    onClose: () => void;
}

export default function ViewAlertsComponent({ onClose }: ViewAlertsProps) {
    const session = useSession();
    const [alerts, setAlerts] = useState<AlertEntry[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

    const fetchAlerts = useCallback(async () => {
        setIsLoading(true);
        try {
            //const session = await getServerSession(asgardeoProviderOptions); 
            const response = await fetch(`${FeatureConfig.getBackendUrl()}/alerts`, {
                headers: {
                    Authorization: `Bearer ${session?.data?.accessToken}`
                }
            });
            if (!response.ok) {
               throw new Error('Network response was not ok');
            }

            const data: AlertEntry[] = await response.json(); 
            setAlerts(data);
            setSuccessSnackbarOpen(true);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
                setErrorSnackbarOpen(true);
            }
        } finally {
            setIsLoading(false);
        }
    }, [session]);

    const handleSuccessSnackbarClose = () => {
        setSuccessSnackbarOpen(false);
    }

    const handleErrorSnackbarClose = () => {
        setErrorSnackbarOpen(false);
    }

    // Call fetchAlerts when the component is mounted
    useEffect(() => {
        fetchAlerts();
    }, [fetchAlerts]);

    return (
        <SessionCheckComponent requiredScopes={FeatureConfig.features.alert.create}>
            <Card variant='outlined' sx={{ width: '40vh', height: '40vh' }}>
                <Snackbar open={successSnackbarOpen} autoHideDuration={2000} onClose={handleSuccessSnackbarClose}>
                    <Alert onClose={handleSuccessSnackbarClose} severity='success'>
                        Alerts fetched successfully
                    </Alert>
                </Snackbar> 
                <Snackbar open={errorSnackbarOpen} autoHideDuration={2000} onClose={handleErrorSnackbarClose}>
                    <Alert onClose={handleErrorSnackbarClose} severity='error'>
                        Problem fetching the alerts
                    </Alert>
                </Snackbar>  
                <CardContent className='alert-card-content'>
                    {isLoading ? (
                        <Typography>Loading...</Typography>
                    ) : error ? (
                        <Typography>Error: {error}</Typography>
                    ) : (
                        alerts.map((alert) => (
                            <Typography key={alert.id}>
                                {alert.symbol}: {alert.price}
                            </Typography>
                        ))
                    )}
                </CardContent>
            </Card>
        </SessionCheckComponent>
    );
}