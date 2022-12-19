import React, { FunctionComponent, HTMLProps } from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Details from './Details';
import PrincipalDetails from './PrincipalDetails';
import { Car } from '../../../shared/Car';

type Props = {
  car: Car;
};

const CarCard: FunctionComponent<Props & HTMLProps<HTMLElement>> = ({ car }) => {
  const { url, doors, fuelType, modelDescription, brandDescription, placeDescription, cost, title } = car;
  return (
    <>
      <Grid item md={4}>
        <Card sx={{ maxWidth: 300 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={`https://test-bucket-luciano.s3.amazonaws.com/${url}`}
              alt={title}
            />
            <CardContent sx={{ padding: 0 }}>
              <PrincipalDetails doors={doors} fuelType={fuelType} />
              <Details model={modelDescription} brand={brandDescription} place={placeDescription} cost={cost} />
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </>
  );
};

export default CarCard;
