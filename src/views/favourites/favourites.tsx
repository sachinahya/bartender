import { FC } from 'react';

import { useFavouriteDrinksQuery } from '../../api/favourite-drinks';
import { BackgroundContainer } from '../../components/background-container';
import { Heading } from '../../components/heading';
import { Footer, Layout, Main } from '../../components/layout';
import { Tile, Tiles } from '../../components/tile';

import * as styles from './favourites.css';

const img =
  'https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3057&q=80';

export const Favourites: FC = () => {
  const { data: drinks = [] } = useFavouriteDrinksQuery();

  return (
    <Layout>
      <Main>
        <BackgroundContainer image={img} imageMaxSize={350} className={styles.intro}>
          <Heading level="h1" className={styles.pageTitle}>
            Favourites
          </Heading>

          <Tiles variant="grid">
            {drinks.map((drink) => (
              <Tile key={drink.id} drink={drink} />
            ))}
          </Tiles>
        </BackgroundContainer>
      </Main>
      <Footer />
    </Layout>
  );
};
