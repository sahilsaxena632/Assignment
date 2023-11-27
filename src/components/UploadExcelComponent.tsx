import React, { useRef } from 'react';
import * as XLSX from 'xlsx';
import { db } from '../../firebase';
import { Button, Typography, Box } from '@mui/material'
import { addDoc, collection } from 'firebase/firestore';

interface ExcelRow {
  [key: string]: string | number;
}

const UploadExcelComponent: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as string[][];

      console.log(jsonData);

      if (jsonData.length < 2) {
        console.error('Not enough data rows in the Excel sheet');
        return;
      }

      const [headers, ...rows] = jsonData;

      const flattenedData: ExcelRow[] = rows.map((row) => {
        const obj: ExcelRow = {};
        for (let i = 0; i < headers.length; i++) {
          obj[headers[i]] = row[i];
        }
        return obj;
      });

      try {
        const batch: Promise<void>[] = flattenedData.map((dataItem) => {
          // Filtered out undefined or null values from dataItem
          const cleanedDataItem: { [key: string]: any } = {};
          Object.entries(dataItem).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              cleanedDataItem[key] = value;
            }
          });
  
          return addDoc(collection(db, 'excelData'), cleanedDataItem).then(() => {});
        });
  
        await Promise.all(batch);
        alert('File uploaded successfully!');
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Box sx={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', maxWidth: '300px' }}>
      <Typography variant="h5" gutterBottom>
        Upload Excel File
      </Typography>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        accept=".xlsx, .xls"
      />
      <Button variant="contained" onClick={handleButtonClick} sx={{ marginBottom: '10px' }}>
        Select File
      </Button>
      <Button variant="contained" onClick={handleFileUpload} sx={{ marginBottom: '10px', marginLeft: '10px' }}>
        Upload
      </Button>
      <Typography variant="body1" gutterBottom>
        Select an Excel file (.xlsx or .xls) to upload.
      </Typography>
      <Typography variant="body2">Supported file formats: .xlsx, .xls</Typography>
    </Box>
  );
};

export default UploadExcelComponent;

