import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';

function HighlightText() {
  return (
    <>
      <Grid item>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          border={2}
          borderColor="#898ba2"
          paddingX={2.5}
          paddingY={0.5}
          marginBottom={5}
          color="#6a6e80"
        >
          DESTACADOS
        </Typography>
      </Grid>
    </>
  );
}

export default HighlightText;
