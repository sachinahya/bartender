import Vibrant from 'node-vibrant';

import { Palette } from '../entities/palette';

const cache = new Map<string, Palette>();
const useCache = true;

export const getPalette = async (image: string | HTMLImageElement): Promise<Palette> => {
  const src = typeof image === 'string' ? image : image.src;

  if (useCache) {
    const cacheResult = cache.get(src);

    if (cacheResult) {
      return cacheResult;
    }
  }

  const vibrant = new Vibrant(image);
  const palette = await vibrant.getPalette();

  const result: Palette = {};
  for (const [name, swatch] of Object.entries(palette)) {
    if (swatch) {
      const parsedName = name.replace(/^[A-Z]/, (match) => match.toLowerCase());
      result[parsedName] = swatch.hex;
    }
  }

  if (useCache) {
    cache.set(src, result);
  }

  return result;
};
