// DisplayDataComponent.tsx
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import { Box, TextField, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material'; // Import Material-UI components

interface DataItem {
  id: number;
  firstname: string;
  lastname : string;
  gender: string;
  email: string;
  // Add other fields as needed from your Firestore document
}

const DisplayDataComponent: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'excelData'));
        const querySnapshot = await getDocs(q);

        const fetchedData: DataItem[] = [];
        querySnapshot.forEach((doc) => {
          const dataItem: DataItem = {
            id: doc.data().id,
            firstname: doc.data().first_name,
            lastname: doc.data().last_name,
            gender: doc.data().gender,
            email: doc.data().email,
             // Replace 'name' with the field you want to display
            // Add other fields here based on your Firestore document structure
          };
          fetchedData.push(dataItem);
        });

        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  const filteredData = data.filter((item) =>
  (item.firstname && item.firstname.toLowerCase().includes(searchName.toLowerCase())) ||
  (item.lastname && item.lastname.toLowerCase().includes(searchName.toLowerCase()))
);
const sortedData = [...filteredData].sort((a, b) => a.id - b.id);

  return (
    <Box sx={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <TextField
        label="Search by Name"
        variant="outlined"
        value={searchName}
        onChange={handleSearch}
        fullWidth
        sx={{ marginBottom: '20px' }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.firstname}</TableCell>
                <TableCell>{item.lastname}</TableCell>
                <TableCell>{item.gender}</TableCell>
                <TableCell>{item.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DisplayDataComponent;