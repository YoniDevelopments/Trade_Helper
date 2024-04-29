"use client";

import { useState, useEffect } from 'react';
import { Box, Button, Grid, Snackbar, Stack, TextField, Typography, Modal } from '@/utils/theme/muiLib'; // Assume you have this setup
import StockChart from './components/StockChart';
import SessionCheckComponent from '@/utils/common/components/sessionCheckComponent';
import { FeatureConfig } from '@/feature_config/featureConfig';
import CreateAlertForm from '../create_alert/createAlertForm'
// Placeholder for future components:
import ViewAlertsComponent from '../view_alert/ViewAlertsComponent';
import DeleteAlertsComponent from '../delete_alert/DeleteAlertsComponent';

// import dynamic from 'next/dynamic';

interface StockData {
  'Meta Data': {
    // ... define Meta Data properties if needed
  };
  [key: string]: any; // Add this line
}


// // Dynamic import of StockChart component
// const DynamicStockChart = dynamic(
//   () => import('./components/StockChart'), // replace './components/StockChart' with the path to your StockChart.tsx file
//   { ssr: false }  // This line is important. It disables server-side rendering for the component.
// );


export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState<'create' | 'view' | 'delete'>('create'); // Initial value is 'create'
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null);
  const [isErrorSnackbarOpen, setIsErrorSnackbarOpen] = useState(false);
  const [symbol, setSymbol] = useState('');
  const [symbolInput, setSymbolInput] = useState('');

  const handleClose = () => {
    setOpenModal(false);
    setModalContent('create'); 
}; 

useEffect(() => {
  const fetchData = async () => {
    setIsLoading(true); // Set loading state to true before fetching
    try {
      const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=full&apikey=demo`, {//for testing
      //const response = await fetch(`http://localhost:9000/fetchStockData/getIntradayStockPrice?symbol=${symbol}&interval=5min`, {
        method: "GET"
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data: StockData = await response.json(); // Parse the fetched data as StockData
      
      
      setStockData(data); // Set the fetched data to your state without transforming it
      
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        setIsErrorSnackbarOpen(true);
      }
    } finally {
      setIsLoading(false); // Set loading state to false after fetch attempt
    }
  };

  if (symbol) {
    fetchData();
  }
}, [symbol]);

  

  const handleFetchStockData = () => {
    setError(null); 
    setSymbol(symbolInput);
    
  };

  return (
    <SessionCheckComponent requiredScopes={FeatureConfig.features.alert.view_chart}>
    <>
          
        
      <Grid className='main-gradient sub-item' container> 
       
        {/* Welcome Messages Grid */}
        <Grid container item xs={12} alignItems='flex-end' justifyContent='center'>
          <Box>
            
              <Box>
                <Typography variant='h1' color='text.primary' align='center' style={{ color: 'black' }}>
                  <b>The Trade Helper APP</b>
                </Typography>
              </Box>
              
            
          </Box>
        </Grid>

        <Grid container item xs={12} justifyContent='center' alignItems='flex-end'> 
          <Box sx={{ width: '100%', maxWidth: 500 }}> {/* Container for form elements */}
            <Stack spacing={2}>
              <TextField 
                value={symbolInput}
                onChange={(e) => setSymbolInput(e.target.value)}
                label="Enter Stock Symbol"
                sx={{ '& .MuiInputBase-input': { color: 'black' } }}
              />
              <Button variant='contained' size='large' style={{ backgroundColor: 'red', color: 'white' }} onClick={handleFetchStockData}>
                 Plot Chart
              </Button>
            </Stack>
            </Box>
        </Grid>
        <Grid container item xs={12} justifyContent='center' alignItems='flex-end'>
        <Grid container item xs={12} justifyContent='center' alignItems='flex-end'>
                    <Stack spacing={4} direction="row" justifyContent="center" alignItems='flex-start'>
                        <Button 
                            variant='contained' 
                            color='secondary' 
                            style={{ marginTop: '20px' }} 
                            onClick={() => {
                                setOpenModal(true);
                                setModalContent('create');
                            }}>
                            Create Alert
                        </Button>
                        <Button 
                            variant='contained' 
                            color='secondary' 
                            style={{ marginTop: '20px' }} 
                            onClick={() => {
                                setOpenModal(true);
                                setModalContent('view');
                            }}>
                            View Alert
                        </Button>
                        <Button 
                            variant='contained' 
                            color='secondary' 
                            style={{ marginTop: '20px' }} 
                            onClick={() => {
                                setOpenModal(true);
                                setModalContent('delete');
                            }}>
                            Delete Alert
                        </Button>
                    </Stack>
                    {/* ... (Rest of your Grid elements) */}
                </Grid>

                <Modal 
                    open={openModal} 
                    onClose={handleClose}
                    aria-labelledby="multi-purpose-modal"
                    aria-describedby="modal-for-different-actions">
                        <Box sx={modalStyle}>  
                            {modalContent === 'create' && <CreateAlertForm onClose={handleClose} />} 
                            {modalContent === 'view' && <ViewAlertsComponent onClose={handleClose} />}
                            {modalContent === 'delete' && <DeleteAlertsComponent onClose={handleClose} />}
                        </Box>
                </Modal>

            
            <Box mt={2} sx={{ width: '100%', maxWidth: 1500 }}>
                <p>A small application for setting stock alerts.</p>
                {isLoading && <p>Loading data...</p>}
                {error && <p>Error: {error}</p>}
                {stockData && <StockChart stockData={stockData} />} 
            </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={isErrorSnackbarOpen}
        onClose={() => setIsErrorSnackbarOpen(false)} // Close function for snackbar
        message="Something went wrong while fetching stock data"
        autoHideDuration={4000} // Auto-close the snackbar after a few seconds
      />
    </>
  </SessionCheckComponent>
  );
}
const modalStyle = {
  position: 'absolute',
  top: '50%', 
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'white',
  boxShadow: 24,
  // ... other styles as needed
};
//export default ViewChartPage;
