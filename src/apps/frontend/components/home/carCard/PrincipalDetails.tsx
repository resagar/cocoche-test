import React, { FunctionComponent, HTMLProps } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import OpacityIcon from '@mui/icons-material/Opacity';

type Props = {
  doors: number;
  fuelType: string;
};

const PrincipalDetails: FunctionComponent<Props & HTMLProps<HTMLElement>> = ({ doors, fuelType }) => {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ backgroundColor: '#4cc3ec' }}
        paddingX={1}
        paddingY={0.5}
      >
        <Grid item paddingRight={0.5}>
          <Grid container direction="row" justifyContent="flex-start" alignItems="center">
            <DriveEtaIcon fontSize="small" sx={{ color: 'white', marginRight: 1 }} />
            <Typography variant="caption" component="div">
              {doors} Puertas
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row" justifyContent="flex-start" alignItems="center" padding={0}>
            <OpacityIcon fontSize="small" sx={{ color: 'white', marginRight: 1 }} />
            <Typography variant="caption" component="div">
              {fuelType}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default PrincipalDetails;
