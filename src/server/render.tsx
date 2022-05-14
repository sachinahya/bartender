import { createMemoryHistory, ReactLocation } from '@tanstack/react-location';
import { Request, Response } from 'express';
import { renderToPipeableStream, renderToString } from 'react-dom/server';
import { dehydrate, QueryClient } from 'react-query';

import { App } from '../app';

export const render = (): string => {
  return renderToString(<App transformation="" isServer />);
};

export const renderStream = (req: Request, res: Response, transformation: string): void => {
  let didError = false;

  const url = req.originalUrl;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
      },
    },
  });
  const dehydratedState = dehydrate(queryClient);

  const history = createMemoryHistory(url ? { initialEntries: [url] } : undefined);
  const location = new ReactLocation({ history });

  const app = (
    <App
      location={location}
      queryClient={queryClient}
      queryState={dehydratedState}
      transformation={transformation}
      isServer
      initialUrl={url}
    />
  );

  const stream = renderToPipeableStream(app, {
    onShellReady() {
      // The content above all Suspense boundaries is ready.
      // If something errored before we started streaming, we set the error code appropriately.
      res.statusCode = didError ? 500 : 200;
      res.setHeader('Content-type', 'text/html');
      stream.pipe(res);
    },
    onShellError(error) {
      // Something errored before we could complete the shell so we emit an alternative shell.
      res.statusCode = 500;
      res.send('<!doctype html><p>Loading...</p><script src="clientrender.js"></script>');
    },
    onAllReady() {
      // If you don't want streaming, use this instead of onShellReady.
      // This will fire after the entire page content is ready.
      // You can use this for crawlers or static generation.
      // res.statusCode = didError ? 500 : 200;
      // res.setHeader('Content-type', 'text/html');
      // stream.pipe(res);
    },
    onError(err) {
      didError = true;
      // eslint-disable-next-line no-console -- Will remove later.
      console.error(err);
    },
  });
};
