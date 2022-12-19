import React from 'react';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import BadgeIcon from '@mui/icons-material/Badge';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const ActionsList = () => {
  return (
    <>
      <Grid item xs={12} sm={6} md={3} xl={3} paddingTop={10}>
        <Grid container spacing={5} direction="column" alignItems="center">
          <Grid item>
            <Item sx={{ borderRadius: 10, padding: 1, backgroundColor: '#4fc1e9' }}>
              <TouchAppIcon sx={{ color: '#ffffff', fontSize: 50 }} />
            </Item>
          </Grid>
          <Grid item>
            <Typography sx={{ textAlign: 'center' }} variant="body1">
              ELEGI UN AUTO
            </Typography>
          </Grid>
          <Grid paddingLeft={5} paddingTop={2}>
            <Typography sx={{ textAlign: 'center' }} variant="body2">
              Acorde a tus intereses
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} md={3} xl={3} paddingTop={10}>
        <Grid container spacing={5} direction="column" alignItems="center">
          <Grid item>
            <Item sx={{ borderRadius: 10, padding: 1, backgroundColor: '#4fc1e9' }}>
              <BadgeIcon fontSize="large" sx={{ color: '#ffffff', fontSize: 50 }} />
            </Item>
          </Grid>
          <Grid item>
            <Typography sx={{ textAlign: 'center' }} variant="body1">
              RETIRA EL AUTO
            </Typography>
          </Grid>
          <Grid paddingLeft={5} paddingTop={2}>
            <Typography sx={{ textAlign: 'center' }} variant="body2">
              Combina un lugar de encuentro con el propietario
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} md={3} xl={3} paddingTop={10}>
        <Grid container spacing={5} direction="column" alignItems="center">
          <Grid item>
            <Item sx={{ borderRadius: 10, padding: 1, backgroundColor: '#4fc1e9' }}>
              <DirectionsCarIcon fontSize="large" sx={{ color: '#ffffff', fontSize: 50 }} />
            </Item>
          </Grid>
          <Grid item>
            <Typography sx={{ textAlign: 'center' }} variant="body1">
              VIAJA SEGURO
            </Typography>
          </Grid>
          <Grid paddingLeft={5} paddingTop={2}>
            <Typography sx={{ textAlign: 'center' }} variant="body2">
              Cocoche cuenta con un seguro todo riesgo y retiene un deposito de la tarjeta como garantia
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} md={3} xl={3} paddingTop={10}>
        <Grid container spacing={5} direction="column" alignItems="center">
          <Grid item>
            <Item sx={{ borderRadius: 10, padding: 1, backgroundColor: '#4fc1e9' }}>
              <CreditCardIcon fontSize="large" sx={{ color: '#ffffff', fontSize: 50 }} />
            </Item>
          </Grid>
          <Grid item>
            <Typography sx={{ textAlign: 'center' }} variant="body1">
              REALIZA EL PAGO
            </Typography>
          </Grid>
          <Grid paddingLeft={5} paddingTop={2}>
            <Typography sx={{ textAlign: 'center' }} variant="body2">
              Abonás el costo del alquiler
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ActionsList;
