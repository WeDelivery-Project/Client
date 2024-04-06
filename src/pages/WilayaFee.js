import { useEffect, useState } from 'react';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';

import { Request } from '../api/config';

const TarifsTable = () => {
  const [wilayas, setWilayas] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    Request('/wilaya')
      .then((res) => {
        setWilayas(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredWilayas =
    wilayas && wilayas.filter((wilaya) => wilaya?.name?.toLowerCase().includes(searchQuery?.toLowerCase()));

  return (
    <>
      <TextField
        className="search"
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <TableContainer component={Paper}>
        <Table className="table" aria-label="tarifs table">
          <TableHead>
            <TableRow>
              <TableCell>Wilaya Code</TableCell>
              <TableCell>Wilaya Name</TableCell>
              <TableCell>Livraison</TableCell>
              <TableCell>Retour</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredWilayas.map((wilaya, index) => (
              <TableRow key={wilaya._id}>
                <TableCell>{wilaya.code}</TableCell>
                <TableCell>{wilaya.name}</TableCell>
                <TableCell sx={{ cursor: 'pointer', '&:hover': { color: 'red' } }}>
                  <strong>{wilaya?.tarifs[0].price} DA</strong>
                </TableCell>
                <TableCell sx={{ cursor: 'pointer', '&:hover': { color: 'red' } }}>
                  <strong>{wilaya?.tarifs[1].price} DA</strong>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TarifsTable;
