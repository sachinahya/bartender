import { useMatch } from '@tanstack/react-location';
import { FC } from 'react';
import { FaHeart } from 'react-icons/fa';
import mergeRefs from 'react-merge-refs';

import {
  Banner,
  BannerAction,
  BannerBackAction,
  BannerOverflowMenu,
  BannerOverflowMenuItem,
  BannerTitle,
} from '../../components/banner';
import { Heading } from '../../components/heading';
import { IconButton } from '../../components/icon-button';
import { Footer, Layout, Main } from '../../components/layout';
import {
  Drink as DrinkType,
  useRandomDrinkQuery,
  useMatchedDrinkQuery,
  useSaveFavouriteDrink,
} from '../../data/drink';
import { useCallbackRef, usePalette, useParallax } from '../../utils';
import { defineVar } from '../../utils/styles';

import * as styles from './drink.css';

export const Drink: FC = () => {
  const { data: drinkById } = useMatchedDrinkQuery();

  const { route } = useMatch();
  const isRandomDrinkView = route.path === 'random';
  const { data: randomDrink } = useRandomDrinkQuery({
    enabled: isRandomDrinkView,
  });

  const mutation = useSaveFavouriteDrink();

  const drinkNoPalette = drinkById || randomDrink;

  const parallaxRef = useParallax(6);
  const [imageRef, setImageRef] = useCallbackRef<HTMLImageElement>();

  const palette = usePalette(imageRef);

  const drink: DrinkType | undefined = drinkNoPalette
    ? { ...drinkNoPalette, palette: palette.palette || {} }
    : undefined;

  const handleFavourite = () => {
    if (drink) {
      mutation.mutate(drink);
    }
  };

  return (
    <Layout>
      <Banner variant="thin">
        <BannerBackAction />
        <BannerTitle />
        <BannerAction>
          <FaHeart />
        </BannerAction>
        <BannerOverflowMenu>
          <BannerOverflowMenuItem>Delete</BannerOverflowMenuItem>
        </BannerOverflowMenu>
      </Banner>
      <Main>
        {drink ? (
          <article
            className={styles.root}
            style={{
              [defineVar(styles.darkVibrantVar)]: drink.palette.darkVibrant,
              [defineVar(styles.lightMutedVar)]: drink.palette.lightMuted,
            }}
          >
            <header className={styles.header}>
              <Heading level="h1" variant="h1" className={styles.drinkName}>
                {drink.name}
              </Heading>
              <IconButton onClick={handleFavourite} aria-label="Add favourite">
                <FaHeart />
              </IconButton>
            </header>

            <img
              src={drink.image}
              className={styles.image}
              ref={mergeRefs([parallaxRef, setImageRef])}
              crossOrigin="anonymous"
            />

            <div className={styles.main}>
              {drink.ingredients.length > 0 && (
                <ul className={styles.ingredients}>
                  {drink.ingredients.map(({ measure, name }) => (
                    <li key={`${measure}-${name}`} className={styles.ingredientItem}>
                      <span className={styles.ingredientMeasure}>{measure}</span>
                      <span className={styles.ingredientName}>{name}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* {drink.tags.length > 0 && (
        <ul
          className={styles.tags}
          style={{ [defineVar(styles.backgroundColorVar)]: drink.palette.lightMuted }}
        >
          {drink.tags.map((tag) => (
            <li key={tag} className={styles.tagItem}>
              {tag}
            </li>
          ))}
        </ul>
      )}

      <div className={styles.ingredients}>
        <div className={styles.ingredientItem}>
          <div>Glass</div>
          <div>{drink.glass}</div>
        </div>
        <div className={styles.ingredientItem}>
          <div>Alcoholic</div>
          <div>{drink.alcoholic}</div>
        </div>
        <div className={styles.ingredientItem}>
          <div>Category</div>
          <div>{drink.category}</div>
        </div>
      </div> */}

              {drink.instructions.length > 0 && (
                <>
                  <Heading level="h3" variant="h2" className={styles.subheading}>
                    How to make
                  </Heading>
                  <ol className={styles.instructions}>
                    {drink.instructions.map((instruction) => (
                      <li key={instruction}>{instruction}</li>
                    ))}
                  </ol>
                </>
              )}

              {drink.palette && (
                <div
                  style={{
                    fontSize: 12,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    textAlign: 'center',
                    lineHeight: 2,
                    marginBlockStart: 20,
                  }}
                >
                  {Object.entries(drink.palette).map(([name, color]) => (
                    <div key={name} style={{ backgroundColor: color }}>
                      {name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </article>
        ) : null}
      </Main>
      <Footer />
    </Layout>
  );
};
