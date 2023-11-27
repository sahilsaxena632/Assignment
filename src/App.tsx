import React, { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import UploadExcelComponent from '../src/components/UploadExcelComponent';
import DisplayDataComponent from '../src/components/DisplayDataComponent';
import Navbar from '../src/components/Navbar';

const App: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState('Upload');

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={2}>
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          Excel Data Upload and Display
        </Typography>
      </Box>

      <Navbar setActiveComponent={setActiveComponent} />

      <Box mt={2}>
        {activeComponent === 'Upload' && (
          <Box>
            <Typography variant="h4" align='center' component="h2" gutterBottom>
              Upload Excel File
            </Typography>
            <UploadExcelComponent />
          </Box>
        )}
        {activeComponent === 'Display' && (
          <Box>
            <Typography variant="h4" align="center" component="h2" gutterBottom>
              Display Data
            </Typography>
            <DisplayDataComponent />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default App;
