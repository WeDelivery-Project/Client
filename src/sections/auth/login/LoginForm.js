import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook
import { Request } from 'src/api/config';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputField = styled(TextField)`
  margin-bottom: 1rem;
`;

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // Instantiate useHistory hook

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Request.post('/client/login', { email, password });
      if (res.status !== 200) throw new Error('Invalid login informations');
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('client', JSON.stringify(res.data.client));
      navigate('/dashboard'); // Redirect to dashboard page
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputField label="Email" variant="outlined" value={email} onChange={handleEmailChange} required />
      <InputField
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        required
      />
      <Button variant="contained" type="submit">
        Login
      </Button>
    </FormContainer>
  );
};

export default LoginForm;
