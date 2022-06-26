import { useEffect, useState } from 'react';

import { Palette } from '../entities/palette';

import { getPalette } from './get-palette';

export interface UsePaletteHook {
  palette?: Palette;
  error?: Error;
  progress: boolean;
}

export const usePalette = (src: string | HTMLImageElement | null | undefined): UsePaletteHook => {
  const [error, setError] = useState<Error>();
  const [progress, setProgress] = useState(false);
  const [palette, setPalette] = useState<Palette>();

  useEffect(() => {
    const palette = async () => {
      try {
        setPalette(undefined);

        if (!src) {
          return;
        }

        setProgress(true);

        const palette = await getPalette(src);

        setProgress(false);
        setPalette(palette);
      } catch (error) {
        if (!(error instanceof Error)) {
          throw error;
        }

        setProgress(false);
        setError(error);
      }
    };

    void palette();
  }, [src]);

  return {
    palette,
    error,
    progress,
  };
};
