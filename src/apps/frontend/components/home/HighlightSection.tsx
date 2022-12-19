import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import CarCard from './carCard/CarCard';
import HighlightText from './HighlightText';
import { Car, CarList } from '../../shared/Car';
import Pagination from '@mui/material/Pagination';
import usePaginationCar from '../../shared/PaginationCar';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const HighlightSection = () => {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<CarList | undefined>(undefined);

  const PER_PAGE = 6;
  const cars: Car[] | never[] = data?.carList || [];
  const count = Math.ceil(cars.length / PER_PAGE);

  const _DATA = usePaginationCar(cars, PER_PAGE);

  const handleChangePagination = (e: ChangeEvent<unknown>, p: number) => {
    setPage(p);
    _DATA.jump(p);
  };

  const handleCloseAlert = (
    event?: Event | SyntheticEvent<Element, Event> | undefined,
    reason?: string | undefined
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (Document) {
      fetch('https://server.cocoche.com.ar/car_listing_presentation?list_length=100').then(res => {
        if (res.status !== 200) {
          setOpen(true);
          return;
        }
        setOpen(false);
        return res.json().then(data => setData(data));
      });
    }
  }, []);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
          List cars request failed
        </Alert>
      </Snackbar>
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <Grid item>
          <HighlightText />
        </Grid>
        <Grid item>
          <Grid
            container
            direction="row"
            spacing={{ xs: 3, sm: 4, md: 6 }}
            justifyContent="space-evenly"
            alignItems="center"
            wrap="wrap"
          >
            {!data ? (
              <CircularProgress sx={{ marginTop: 5, marginLeft: 5 }} />
            ) : (
              _DATA.currentData().map((car, i) => <CarCard key={i} car={car} />)
            )}
          </Grid>
        </Grid>
        <Grid item marginTop={3}>
          <Pagination color="primary" count={count} size="large" page={page} onChange={handleChangePagination} />
        </Grid>
      </Grid>
    </>
  );
};

export default HighlightSection;
