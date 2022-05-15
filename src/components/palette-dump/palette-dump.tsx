import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';

import { Palette } from '../../utils';

import * as styles from './palette-dump.css';

export interface PaletteDumpProps extends HTMLAttributes<HTMLElement> {
  palette: Palette;
}

export const PaletteDump: FC<PaletteDumpProps> = ({ palette, ...props }) => {
  return (
    <div {...props} className={clsx(styles.root, props.className)}>
      {Object.entries(palette).map(([name, color]) => (
        <div
          key={name}
          className={styles.segment}
          style={assignInlineVars({ [styles.backgroundColorVar]: color || '' })}
        >
          {name}
        </div>
      ))}
    </div>
  );
};
