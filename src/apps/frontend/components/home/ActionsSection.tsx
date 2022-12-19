import Grid from '@mui/material/Grid';
import React from 'react';
import ActionsList from './actions/ActionsList';

const ActionsSection = () => {
  return (
    <>
      <Grid container direction="row" justifyContent="space-evenly" alignItems="center" marginBottom={10}>
        <ActionsList />
      </Grid>
    </>
  );
};

export default ActionsSection;
