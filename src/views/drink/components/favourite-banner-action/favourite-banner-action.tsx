import { FC } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import { BannerAction } from '../../../../components/banner';
import { Drink } from '../../../../data/drink';
import {
  useIsFavouriteDrinkQuery,
  useFavouriteDrinkToggle,
} from '../../../../data/drink/favourite-drinks';

export interface FavouriteBannerActionProps {
  drink: Drink;
}

export const FavouriteBannerAction: FC<FavouriteBannerActionProps> = ({ drink }) => {
  const { data: isFavourite } = useIsFavouriteDrinkQuery({ id: drink.id });
  const toggleMutation = useFavouriteDrinkToggle({ id: drink.id });

  const handleClick = () => {
    if (isFavourite != null) {
      toggleMutation.mutate({});
    }
  };

  return isFavourite == null ? null : (
    <BannerAction onClick={handleClick}>{isFavourite ? <FaHeart /> : <FaRegHeart />}</BannerAction>
  );
};
