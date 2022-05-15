import clsx from 'clsx';
import { FC, Suspense } from 'react';

import { BackgroundContainer } from '../../components/background-container';
import { Heading } from '../../components/heading';
import { Footer, Layout, Main } from '../../components/layout';

import { IngredientsTiles } from './components/ingredients-tiles';
import { RandomDrinksTiles } from './components/random-drinks-tiles';
import * as styles from './discover.css';

const img =
  'https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3057&q=80';

export const Discover: FC = () => {
  return (
    <Layout>
      <Main>
        <BackgroundContainer image={img} imageMaxSize={350} className={styles.intro}>
          <Heading level="h1" className={styles.pageTitle}>
            Discover
          </Heading>

          <Heading level="h2" variant="h1" className={styles.sectionTitle}>
            Random
          </Heading>
          <RandomDrinksTiles className={clsx(styles.tiles, styles.slider)} />
          {/* <Suspense fallback="Loading drinks...">
          </Suspense> */}

          <Heading level="h2" variant="h1" className={styles.sectionTitle}>
            Ingredients
          </Heading>
          <Suspense fallback="Loading ingredients...">
            <IngredientsTiles className={styles.tiles} />
          </Suspense>
        </BackgroundContainer>
      </Main>
      <Footer />
    </Layout>
  );
};
