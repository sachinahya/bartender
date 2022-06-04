import { createMemoryHistory, ReactLocation, Router } from '@tanstack/react-location';
import { FC, ReactNode, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export const MockQueryClient: FC<{ children?: ReactNode }> = ({ children }) => {
  const queryClient = useMemo(() => new QueryClient(), []);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export const MockRoutes: FC<{ children?: ReactNode; path?: string; initialEntry?: string }> = ({
  children,
  path = '/',
  initialEntry = '/',
}) => {
  const location = useMemo(
    () => new ReactLocation({ history: createMemoryHistory({ initialEntries: [initialEntry] }) }),
    [initialEntry],
  );

  return (
    <Router
      location={location}
      routes={[
        {
          path,
          element: children,
        },
      ]}
    />
  );
};

export const createWrapper = ({
  path,
  initialEntry,
}: {
  path?: string;
  initialEntry?: string;
} = {}): FC<{ children?: ReactNode }> => {
  // eslint-disable-next-line react/function-component-definition -- Needs a name.
  return function Wrapper({ children }) {
    return (
      <MockQueryClient>
        <MockRoutes path={path} initialEntry={initialEntry}>
          {children}
        </MockRoutes>
      </MockQueryClient>
    );
  };
};
