import { useMatch } from '@tanstack/react-location';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { FC } from 'react';

import { useMatchedDrinkQuery } from '../../api/queries/drink-by-id';
import { useRandomDrinkQuery } from '../../api/queries/random-drink';
import {
  Banner,
  BannerBackAction,
  BannerOverflowMenu,
  BannerOverflowMenuItem,
  BannerTitle,
} from '../../components/banner';
import { Heading } from '../../components/heading';
import { Footer, Layout, Main } from '../../components/layout';
import { PaletteDump } from '../../components/palette-dump';
import { useParallax } from '../../utils';

import { FavouriteBannerAction } from './components/favourite-banner-action';
import * as styles from './drink.css';

export const Drink: FC = () => {
  const { data: drinkById } = useMatchedDrinkQuery();

  const { route } = useMatch();
  const isRandomDrinkView = route.path === 'random';
  const { data: randomDrink } = useRandomDrinkQuery({
    enabled: isRandomDrinkView,
  });

  const drink = drinkById || randomDrink;

  const parallaxRef = useParallax(6);

  return (
    <Layout>
      <Banner variant="thin">
        <BannerBackAction />
        <BannerTitle />
        {drink && <FavouriteBannerAction drink={drink} />}
        <BannerOverflowMenu>
          <BannerOverflowMenuItem>Delete</BannerOverflowMenuItem>
        </BannerOverflowMenu>
      </Banner>
      <Main>
        {drink ? (
          <article
            className={styles.root}
            style={assignInlineVars({
              [styles.darkVibrantVar]: drink.palette?.darkVibrant || '',
              [styles.lightMutedVar]: drink.palette?.lightMuted || '',
            })}
          >
            <header className={styles.header}>
              <Heading level="h1" variant="h1" className={styles.drinkName}>
                {drink.name}
              </Heading>
            </header>

            <img
              src={drink.image}
              className={styles.image}
              ref={parallaxRef}
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

              {drink.palette && <PaletteDump palette={drink.palette} />}
            </div>
          </article>
        ) : null}
      </Main>
      <Footer />
    </Layout>
  );
};
