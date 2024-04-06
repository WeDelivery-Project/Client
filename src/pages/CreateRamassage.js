import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Button,
  Container,
  Typography,
  Grid,
  FormControl,
  TextField,
  Box,
  Modal,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Request } from 'src/api/config';

export default function CreateRamassage() {
  const [ramassageInformations, setRamassageInformations] = useState({ date: new Date(), wilaya: '', commune: '' });
  const [wilayas, setWilayas] = useState([]);
  const [communes, setCommunes] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const ramassage = { ...ramassageInformations };
    ramassage[name] = value;
    setRamassageInformations({ ...ramassage });
    if (name === 'wilaya') fetchCommune(value);
  };

  const setDate = (date) => {
    setRamassageInformations({ ...ramassageInformations, date });
  };

  const getPrix = (wilaya) => {
    let w = wilayas.find((w) => w._id === wilaya);
    if (w) return w.tarifs[0].price;
    return 300;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await Request.post('/ramassage/', {
        ...ramassageInformations,
        prix: getPrix(ramassageInformations.wilaya),
      });
      console.log(res);
      handleOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWilaya = async () => {
    try {
      const res = await Request.get('/wilaya/');
      setWilayas(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCommune = async (wilaya) => {
    try {
      const res = await Request.get(`/commune/${wilaya}`);
      setCommunes(res.data);
      console.log('Communes :');
      console.log(res.data);
    } catch (error) {}
  };

  // Get Wilaya
  useEffect(() => {
    fetchWilaya();
  }, []);

  // Modal config
  // Modal config
  const [openModalSucces, setOpenModalSucces] = useState(false);
  const handleOpen = () => setOpenModalSucces(true);
  const handleCloseModalSuccesRamassa = () => {
    navigate('/dashboard/ramassage/');
    setOpenModalSucces(false);
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <Helmet>
        <title> {`New Ramassage`} </title>
      </Helmet>
      <Container onSubmit={handleSubmit} component="form" sx={{ width: '50%' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {' '}
          Créer un nouveau ramasssage
        </Typography>
        {/* <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                sx={{ mb: 2 }}
                id="client"
                label="Client"
                variant="outlined"
                value={ramassageInformations.client}
                onChange={handleInputChange}
                name="client"
                fullWidth
                required
              />
            </FormControl>
          </Grid>
        </Grid> */}

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Wilaya</InputLabel>
            <Select
              sx={{ mb: 2 }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={ramassageInformations.wilaya}
              label="Wilaya"
              name="wilaya"
              variant="outlined"
              onChange={handleInputChange}
              fullWidth
              required
            >
              {wilayas.map((w) => (
                <MenuItem key={w._id} value={w._id}>
                  {`${w.name} `} <span style={{ marginLeft: 'auto', color: 'gray' }}>{w.tarifs[0].price} Da</span>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Commune</InputLabel>
            <Select
              sx={{ mb: 2 }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={ramassageInformations.commune}
              label="Commune"
              name="commune"
              variant="outlined"
              onChange={handleInputChange}
              fullWidth
              required
            >
              {communes.map((c) => (
                <MenuItem key={c._id} value={c._id}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              sx={{ mb: 2 }}
              id="adresse"
              label="Adresse"
              variant="outlined"
              value={ramassageInformations.adresse}
              onChange={handleInputChange}
              type="text"
              name="adresse"
              fullWidth
              required
            />
          </FormControl>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  sx={{ mb: 2 }}
                  width="20%"
                  id="date"
                  label="Date"
                  format="yyyy-MM-dd"
                  value={ramassageInformations.date}
                  onChange={setDate}
                  name="date"
                  required
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              sx={{ mb: 2 }}
              id="comment"
              label="Commentaire"
              variant="outlined"
              value={ramassageInformations.comment}
              onChange={handleInputChange}
              type="tel"
              name="comment"
              fullWidth
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button
            sx={{ mb: 2 }}
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            style={{ marginTop: 16 }}
            // onClick={handleSubmit}
          >
            Create Client
          </Button>
        </Grid>

        <Modal
          open={openModalSucces}
          onClose={handleCloseModalSuccesRamassa}
          aria-labelledby="Client created modal"
          aria-describedby="Client created modal"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Ramassage crée!
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Le ramassage <strong>{ramassageInformations.adresse}</strong> a été crée avec succès.
            </Typography>
          </Box>
        </Modal>
      </Container>
    </>
  );
}
