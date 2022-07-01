import { useMatch } from '@tanstack/react-location';
import { FC, Suspense } from 'react';

import { useMatchedDrinksByIngredientQuery } from '../../api/queries/drinks-by-ingredient';
import { useMatchedIngredientQuery } from '../../api/queries/ingredient-by-name';
import { BackgroundContainer } from '../../components/background-container';
import { Heading } from '../../components/heading';
import { Footer, Layout, Main } from '../../components/layout';
import { DrinkTiles, SkeletonTiles } from '../../components/tile';

import * as styles from './ingredient.css';

const img =
  'https://images.unsplash.com/photo-1529729452430-d35a0213b820?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2835&q=80';

const IngredientDescription: FC = () => {
  const { data: ingredient } = useMatchedIngredientQuery();

  return <div>{ingredient.description}</div>;
};

const IngredientDrinks: FC = () => {
  const { data: drinks } = useMatchedDrinksByIngredientQuery();
  return <DrinkTiles variant="grid" drinks={drinks} className={styles.drinkTiles} />;
};

export const Ingredient: FC = () => {
  const { params } = useMatch();
  const ingredientName = decodeURIComponent(params.name || '');

  return (
    <Layout>
      <Main>
        <BackgroundContainer image={img} imageMaxSize={350} forceMinSize className={styles.intro}>
          <Heading level="h1" className={styles.pageTitle}>
            {ingredientName}
          </Heading>

          <IngredientDescription />

          <Suspense fallback={<SkeletonTiles count={6} className={styles.drinkTiles} />}>
            <IngredientDrinks />
          </Suspense>
        </BackgroundContainer>
      </Main>
      <Footer />
    </Layout>
  );
};
