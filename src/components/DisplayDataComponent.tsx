// DisplayDataComponent.tsx
import React, { useEffect, useState } from 'react';
import  {db}  from '../../firebase';

interface ExcelData {
  name: string;
  age: number;
  // Add other fields from your Excel data
}

const DisplayDataComponent: React.FC = () => {
    const [data, setData] = useState<ExcelData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const docRef = db.collection('excelData').doc('uploadedData');
          const doc = await docRef.get();
          if (doc.exists) {
            setData(doc.data()?.data);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    const filteredData = data.filter((row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase())
      // Add more conditions for other fields if needed
    );
  
    return (
      <div>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            {/* Add more headers based on your Excel columns */}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.age}</td>
              {/* Display other row fields */}
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    );
  };
  
  export default DisplayDataComponent;
