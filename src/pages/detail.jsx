import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  CircularProgress,
  Grid,
  Container
} from '@mui/material';

export default function Detail() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error('Error en la respuesta de la API');
        return response.json();
      })
      .then((data) => {
        setCoin(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <CircularProgress sx={{ m: 4 }} />;
  if (error || !coin) return <Typography color="error">Error: {error}</Typography>;

  const {
    name,
    symbol,
    image,
    market_data,
    last_updated,
  } = coin;

  const priceUsd = market_data?.current_price?.usd;
  const change24h = market_data?.price_change_percentage_24h;
  const marketCap = market_data?.market_cap?.usd;
  const volume = market_data?.total_volume?.usd;

  return (
    <Container sx={{ mt: 5 }}>
      <Card>
        <CardHeader
          avatar={<Avatar src={image?.small} alt={name} />}
          title={`${name} (${symbol.toUpperCase()})`}
          subheader={`Última actualización: ${new Date(last_updated).toLocaleString()}`}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Precio USD</Typography>
              <Typography variant="h5">
                ${priceUsd?.toLocaleString() || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Cambio 24h</Typography>
              <Typography
                variant="h5"
                color={change24h >= 0 ? 'success.main' : 'error.main'}
              >
                {change24h?.toFixed(2) || 0}%
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Market Cap</Typography>
              <Typography variant="body1">
                ${marketCap?.toLocaleString() || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Volumen 24h</Typography>
              <Typography variant="body1">
                ${volume?.toLocaleString() || 'N/A'}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
