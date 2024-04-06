import { Button, Container, FormControl, Grid, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { Request } from '../api/config';

export default function UpdateRole() {
  const [client, setClient] = useState({ firstname: '', lastname: '', phone: '' });
  const idClient = localStorage.getItem('client') ? JSON.parse(localStorage.getItem('client'))._id : null;
  const navigate = useNavigate();
  useEffect(() => {
    if (!idClient) {
      alert('Erreur innatendu!');
    } else {
      Request(`/client/find/${idClient}`)
        .then((res) => setClient(res.data))
        .catch(() => alert('Erreur innatendu!'));
    }
  }, [idClient]);

  const handleSubmit = async () => {
    try {
      await Request.put(`/client/${idClient}`, {
        firstname: client.firstname,
        lastname: client.lastname,
        phonenumber: client.phone,
      });
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container sx={{ width: '60%' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Update Profile
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <TextField
              label="Firstname"
              variant="outlined"
              value={client?.firstname}
              onChange={(event) => {
                setClient({ ...client, firstname: event.target.value });
              }}
              name="firstname"
              type="text"
              fullWidth
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <TextField
              label="Lastname"
              variant="outlined"
              value={client?.lastname}
              onChange={(event) => {
                setClient({ ...client, lastname: event.target.value });
              }}
              name="lastname"
              type="text"
              fullWidth
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <TextField
              label="Phone Number"
              variant="outlined"
              value={client?.phone}
              onChange={(event) => {
                setClient({ ...client, phone: event.target.value });
              }}
              name="phone"
              type="text"
              fullWidth
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            size="large"
            fullWidth
            onClick={() => {
              handleSubmit();
            }}
            style={{ marginTop: 16 }}
          >
            Update Profile
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
