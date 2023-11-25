// UploadExcelComponent.tsx
import React from 'react';
 // Import the Firestore instance 'db' from your Firebase config file
import * as XLSX from 'xlsx';
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";


const UploadExcelComponent: React.FC = () => {
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      try {
        // Get a reference to a Firestore collection and set document data
        const docRef = await addDoc(collection(db, "excelData"), {
          data: jsonData,    
        });
        alert('File uploaded successfully!');
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', maxWidth: '300px' }}>
      <h2>Upload Excel File</h2>
      <input
        type="file"
        onChange={handleFileUpload}
        style={{ marginBottom: '10px' }}
        accept=".xlsx, .xls"
      />
      <p>Select an Excel file (.xlsx or .xls) to upload.</p>
      <p>Supported file formats: .xlsx, .xls</p>
    </div>
  );
};

export default UploadExcelComponent;
