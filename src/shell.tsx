import { FC, ReactNode, StrictMode, Suspense } from 'react';

export interface ShellProps {
  head?: ReactNode;
  body?: ReactNode;
}

export const Shell: FC<ShellProps> = ({ head, body }) => {
  return (
    <StrictMode>
      <html lang="en">
        <head>
          <meta charSet="utf8" />
          <link rel="icon" type="image/svg+xml" href="/src/favicon.svg" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400&display=swap"
            rel="stylesheet"
          />
          <title>App</title>
          {head}
          <script type="module" src={'/src/main.tsx'}></script>
        </head>
        <body>{body}</body>
      </html>
    </StrictMode>
  );
};
