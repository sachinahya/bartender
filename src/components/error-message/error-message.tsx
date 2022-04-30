import { FC } from 'react';

import { Button } from '../button';
import { Heading } from '../heading';

export interface ErrorMessageProps {
  error?: Error;
  resetErrorBoundary?: (...args: unknown[]) => void;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div>
      <Heading level="h1">Error happened!</Heading>
      <div>
        <Button onClick={resetErrorBoundary}>Try again</Button>
      </div>
      <pre>{JSON.stringify(error, undefined, 2)}</pre>
    </div>
  );
};
