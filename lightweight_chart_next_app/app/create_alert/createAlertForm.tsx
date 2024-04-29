'use strict';

import { FeatureConfig } from '@/feature_config/featureConfig';
import { Alert, Button, Box, Card, CardContent, Snackbar, Stack, TextField } from '@/utils/theme/muiLib';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import SessionCheckComponent from '@/utils/common/components/sessionCheckComponent';
import { getServerSession } from 'next-auth/next';
import { asgardeoProviderOptions } from '@/utils/auth/authOptions'; // Make sure this path is correct

interface CreateAlertFormProps {
    onClose: () => void; 
}

export default function CreateAlertForm({ onClose }: CreateAlertFormProps) { 
    const session = useSession();
    const [symbol, setSymbol] = useState<string | null>(null);
    const [price, setPrice] = useState<number | null>(null);
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

    const addAlert = async () => {
        try {
            //const session = await getServerSession(asgardeoProviderOptions);
            const response = await fetch(`${FeatureConfig.getBackendUrl()}/alerts`, {
                method: 'POST',
                body: JSON.stringify({
                    symbol: symbol,
                    price: price,
                }),
                headers: {
                    Authorization: `Bearer ${session?.data?.accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                resetForm();
                setSuccessSnackbarOpen(true);
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            setErrorSnackbarOpen(true); 
            console.error('Error adding alert:', error); // Log the error properly
        }
    };

    const disableCreateAlertButton = () =>
        (!symbol || symbol === '') || (!price || price === null);

    const disableCancelButton = () =>
        (!symbol || symbol === '') && (!price || price === null);

    const resetForm = () => {
        setSymbol('');
        setPrice(null);
    }

    const handleSuccessSnackbarClose = () => {
        setSuccessSnackbarOpen(false);
    }

    const handleErrorSnackbarClose = () => {
        setErrorSnackbarOpen(false);
    }

    return (
        <SessionCheckComponent requiredScopes={FeatureConfig.features.alert.create}>
            <Card variant='outlined' sx={{ width: '40vh', height: '40vh' }}>
                <Snackbar open={successSnackbarOpen} autoHideDuration={2000} onClose={handleSuccessSnackbarClose}>
                    <Alert onClose={handleSuccessSnackbarClose} severity='success'>
                        Alert added successfully
                    </Alert>
                </Snackbar> 
                <Snackbar open={errorSnackbarOpen} autoHideDuration={2000} onClose={handleErrorSnackbarClose}>
                <Alert onClose={handleErrorSnackbarClose} severity='error'>
                    Problem adding the alert
                </Alert>
            </Snackbar>  
                <CardContent className='alert-card-content'>
                             
                     <Stack spacing={2} className='alert-card-content'>
                         <TextField
                             required
                             fullWidth
                             id='filled-required'
                             label='Symbol'
                             placeholder='Enter the symbol'
                             variant='filled'
                             value={symbol}
                             onChange={(e) => setSymbol(e.target.value)}
                         />
                         <TextField
                             required
                             fullWidth
                             id='filled-required'
                             label='Price'
                             placeholder='Enter the price'
                             variant='filled'
                             value={price}
                             onChange={(e) => setPrice(parseFloat(e.target.value))}
                         />
                     </Stack>  
                    <Stack direction='row-reverse' spacing={2} >
                        <Button variant='contained' disabled={disableCreateAlertButton()} onClick={addAlert}>
                            Create Alert
                        </Button>
                        <Button disabled={disableCancelButton()} onClick={() => { 
                            onClose(); // Close the modal
                            resetForm(); // Reset the form
                        }}>
                            Cancel
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </SessionCheckComponent>
    );
}
