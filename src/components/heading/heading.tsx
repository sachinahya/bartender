import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';

import * as styles from './heading.css';

const headingLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;

export type HeadingLevel = typeof headingLevels[number];

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level: HeadingLevel;
  variant?: HeadingLevel;
}

export const Heading: FC<HeadingProps> = ({
  level: HeadingLevel,
  variant = HeadingLevel,
  ...props
}) => {
  if (!headingLevels.includes(HeadingLevel)) {
    throw new Error(`Invalid heading element: '${HeadingLevel}'`);
  }

  return <HeadingLevel {...props} className={clsx(styles.heading[variant], props.className)} />;
};
