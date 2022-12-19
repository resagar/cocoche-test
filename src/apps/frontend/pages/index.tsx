import Head from 'next/head';
import Container from '@mui/material/Container';
import CarsListSection from '../components/CarsListSection';
import HighlightSection from '../components/home/HighlightSection';
import ActionsSection from '../components/home/ActionsSection';

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container maxWidth="lg">
          <section>
            <ActionsSection />
          </section>
        </Container>
        <CarsListSection>
          <Container maxWidth="lg" sx={{ paddingTop: 5, paddingBottom: 5 }}>
            <HighlightSection />
          </Container>
        </CarsListSection>
      </main>
    </>
  );
}
