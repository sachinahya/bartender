import { FC } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import { useFavouriteDrinkToggle } from '../../../../api/mutations/toggle-favourite-drink';
import { useIsFavouriteDrinkQuery } from '../../../../api/queries/is-favourite-drink';
import { BannerAction } from '../../../../components/banner';
import { Drink } from '../../../../entities';

export interface FavouriteBannerActionProps {
  drink: Drink;
}

export const FavouriteBannerAction: FC<FavouriteBannerActionProps> = ({ drink }) => {
  const { data: isFavourite } = useIsFavouriteDrinkQuery({ id: drink.id });
  const toggleMutation = useFavouriteDrinkToggle({ drink });

  const handleClick = () => {
    if (isFavourite != null) {
      toggleMutation.mutate({});
    }
  };

  return isFavourite == null ? null : (
    <BannerAction onClick={handleClick}>{isFavourite ? <FaHeart /> : <FaRegHeart />}</BannerAction>
  );
};
