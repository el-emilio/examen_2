import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router';


const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', py: 8 }}>
      <Box>
        <Typography variant="h1" component="h1" color="primary" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          Página no encontrada
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Lo sentimos, la página que estás buscando no existe o fue movida.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGoHome}>
          Volver al inicio
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
