import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { FunctionComponent, HTMLProps } from 'react';

type Props = {
  model: string;
  brand: string;
  place: string;
  cost: number;
};

const Details: FunctionComponent<Props & HTMLProps<HTMLElement>> = ({ model, brand, place, cost }) => {
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        paddingX={2}
        paddingTop={1}
        paddingBottom={2}
      >
        <Grid item>
          <Typography gutterBottom variant="h5" component="div">
            $ {cost}
          </Typography>
        </Grid>
        <Grid item>
          <Typography gutterBottom variant="body1" component="div" sx={{ color: '#56c3ea' }}>
            {brand} {model}
          </Typography>
        </Grid>
        <Grid item>
          <Typography gutterBottom variant="body2" component="div">
            {place}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Details;
