import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Link } from 'react-router';
import Sort from './sort';

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [sortOption, setSortOption] = useState(''); 
  const [limit, setLimit] = useState(null); // Nuevo estado para el límite
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
      .then((response) => {
        if (!response.ok) throw new Error('Error en la respuesta de la API');
        return response.json();
      })
      .then((data) => {
        setCoins(data);
        console.log('Monedas cargadas:', data.length);
      })
      .catch((err) => console.log(err.message));
  }, []);

  // Ordenar las monedas
  const sortedCoins = [...coins].sort((a, b) => {
    if (sortOption === 'price-asc') return a.current_price - b.current_price;
    if (sortOption === 'price-desc') return b.current_price - a.current_price;
    return 0;
  });

  // Aplicar el límite si existe
  const displayedCoins = limit ? sortedCoins.slice(0, limit) : sortedCoins;

  const handleSort = (option, newLimit = null) => {
    setSortOption(option);
    if (newLimit !== null) {
      setLimit(newLimit);
    }
    console.log('Opción de ordenamiento:', option, 'Límite:', newLimit);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      {/* Encabezado con título y botón a la derecha */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          COINAPP
        </Typography>

        <IconButton color="primary" onClick={() => setDrawerOpen(true)}>
          <FilterListIcon />
        </IconButton>
      </Box>

      {/* Drawer del sort */}
      <Sort
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSort={handleSort}
        currentLimit={limit}
      />

      {/* Mostrar información del límite actual */}
      {limit && (
        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          Mostrando {displayedCoins.length} de {sortedCoins.length} criptomonedas
        </Typography>
      )}

      {/* Grid de monedas (usamos displayedCoins) */}
      <Grid container spacing={2}>
        {displayedCoins.map((coin) => (
          <Grid item xs={12} sm={6} md={3} key={coin.id}>
            <Card>
              <CardActionArea
                sx={{ display: 'flex', justifyContent: 'space-between' }}
                component={Link}
                to={`/detail/${coin.id}`}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                      {coin.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{ color: 'text.secondary' }}
                    >
                      {coin.symbol.toUpperCase()}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{ 
                        color: 'green',
                        fontWeight: 'bold'
                      }}
                    >
                      ${coin.current_price.toLocaleString()} USD
                    </Typography>
                  </CardContent>
                </Box>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={coin.image}
                  alt={coin.name}
                />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}