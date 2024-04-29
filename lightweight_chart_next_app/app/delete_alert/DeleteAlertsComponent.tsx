'use strict';

import { Box, Button, Typography, TextField, Grid, Card, CardContent, Snackbar, Alert } from '@/utils/theme/muiLib'; 
import SessionCheckComponent from '@/utils/common/components/sessionCheckComponent';
import { FeatureConfig } from '@/feature_config/featureConfig';
import { useState, useCallback, useEffect } from 'react'; 
import { getServerSession } from 'next-auth/next';
 
import { useSession } from 'next-auth/react';

interface AlertEntry { 
    id: string;
    symbol: string;
    price: number;
}

interface DeleteAlertsProps {
    onClose: () => void;
}

export default function DeleteAlertsComponent({ onClose }: DeleteAlertsProps) {
    const [isLoading, setIsLoading] = useState(false);
    const session = useSession();
    const [alerts, setAlerts] = useState<AlertEntry[]>([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

    const fetchAlerts = useCallback(async () => {
        setIsLoading(true);
        //setIsDeleting(true);
        try {
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
            //setIsDeleting(false);
            setIsLoading(false)
        }
    }, [session]);

    const handleDelete = useCallback(async (alertId: string) => {
        setIsDeleting(true);
        setError(null); 

        try {
            const response = await fetch(`${FeatureConfig.getBackendUrl()}/alerts`, {
                method: 'DELETE', 
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session?.data?.accessToken}`
                },
                body: JSON.stringify({ id: alertId }) 
            });

            if (response.ok) {
                setSuccess(true);
                // Remove the deleted alert from the list
                setAlerts(alerts.filter(alert => alert.id !== alertId));
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
        } finally {
            setIsDeleting(false);
        }
    }, [session, alerts]);

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
        <SessionCheckComponent requiredScopes={FeatureConfig.features.alert.delete}>
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
                    {isDeleting ? (
                        <Typography>Loading...</Typography>
                    ) : error ? (
                        <Typography>Error: {error}</Typography>
                    ) : (
                        alerts.map((alert) => (
                            <Box key={alert.id}>
                                <Typography>
                                    {alert.symbol}: {alert.price}
                                </Typography>
                                <Button 
                                    variant="contained" 
                                    color="error" 
                                    onClick={() => handleDelete(alert.id)} 
                                    disabled={isDeleting}>
                                        Delete
                                </Button>
                            </Box>
                        ))
                    )}
                </CardContent>
            </Card>
        </SessionCheckComponent>
    );
}