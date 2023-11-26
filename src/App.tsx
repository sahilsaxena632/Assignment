import React from 'react';
import UploadExcelComponent from '../src/components/UploadExcelComponent';
import DisplayDataComponent from '../src/components/DisplayDataComponent';

const App: React.FC = () => {
  return (
    <div>
      <h1>Excel Data Upload and Display</h1>
      <UploadExcelComponent/>
      <DisplayDataComponent/>
    
    </div>
  );
};

export default App;
