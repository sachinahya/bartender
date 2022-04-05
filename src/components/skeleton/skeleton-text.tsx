import { FC, HTMLAttributes } from 'react';

export interface SkeletonProps extends HTMLAttributes<HTMLElement> {
  isLoaded?: boolean;
}

// This is, well a skeleton component for now.
export const Skeleton: FC<SkeletonProps> = (props) => {
  return <div {...props} />;
};

export interface SkeletonTextProps extends HTMLAttributes<HTMLElement> {
  isLoaded?: boolean;
}

export const SkeletonText: FC<SkeletonTextProps> = (props) => {
  return <div {...props} />;
};
