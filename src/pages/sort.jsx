import React, { useState } from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  Typography,
  TextField,
  Box,
  Button
} from '@mui/material';

const Sort = ({ open, onClose, onSort, currentLimit }) => {
  const [limitInput, setLimitInput] = useState(currentLimit || '');

  const handleSort = (criteria) => {
    onSort(criteria, null); // Solo ordenar, sin límite
    onClose();
  };

  const handleLimitApply = () => {
    const limitValue = parseInt(limitInput);
    if (!isNaN(limitValue) && limitValue > 0) {
      onSort('', limitValue); // Aplicar límite sin cambiar orden
      onClose();
    }
  };

  const handleClearLimit = () => {
    setLimitInput('');
    onSort('', null); // Quitar límite
    onClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 250, p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Ordenar por:
        </Typography>

        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleSort('price-asc')}>
              <ListItemText primary="Descendente" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => handleSort('price-desc')}>
              <ListItemText primary="Ascendente" />
            </ListItemButton>
          </ListItem>
        </List>

        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
          Limitar resultados:
        </Typography>

        <TextField
          label="Número de resultados"
          type="number"
          value={limitInput}
          onChange={(e) => setLimitInput(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          inputProps={{ min: 1 }}
        />

        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Button 
            variant="contained" 
            onClick={handleLimitApply}
            fullWidth
          >
            Aplicar
          </Button>
          <Button 
            variant="outlined" 
            onClick={handleClearLimit}
            fullWidth
          >
            Limpiar
          </Button>
        </Box>

        {currentLimit && (
          <Typography variant="body2" color="text.secondary">
            Límite actual: {currentLimit}
          </Typography>
        )}
      </Box>
    </Drawer>
  );
};

export default Sort;