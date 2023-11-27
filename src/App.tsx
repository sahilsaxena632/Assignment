import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import UploadExcelComponent from '../src/components/UploadExcelComponent';
import DisplayDataComponent from '../src/components/DisplayDataComponent';

const App: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box mt={4} mb={2}>
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          Excel Data Upload and Display
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Box width="50%"> {/* Adjust the width as needed */}
          <Typography variant="h4" component="h2" gutterBottom>
            Upload Excel File
          </Typography>
          <UploadExcelComponent />
        </Box>

        <Box  width="100%" height={300}> 
          <Typography variant="h4" align="right" component="h2" gutterBottom>
            Display Data
          </Typography>
          <DisplayDataComponent />
        </Box>
      </Box>
    </Container>
  );
};

export default App;