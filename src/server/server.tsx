/* eslint-disable import/no-nodejs-modules -- Server file. */
// eslint-disable-next-line unicorn/import-style -- Need to enable TS synthetic imports.
import * as path from 'path';
/* eslint-enable import/no-nodejs-modules -- Server file. */

import * as express from 'express';
import { createServer as createViteServer } from 'vite';

const createServer = async () => {
  const app = express();

  app.use(express.static('dist'));

  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' },
  });

  app.use(vite.middlewares);

  // eslint-disable-next-line @typescript-eslint/no-misused-promises -- Will fix later.
  app.use('/', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
      //    also applies HTML transforms from Vite plugins, e.g. global preambles
      //    from @vitejs/plugin-react
      const transformation = await vite.transformIndexHtml(url, '');

      // 3. Load the server entry. vite.ssrLoadModule automatically transforms
      //    your ESM source code to be usable in Node.js! There is no bundling
      //    required, and provides efficient invalidation similar to HMR.
      const { renderStream } = (await vite.ssrLoadModule(
        path.resolve(__dirname, './render.tsx'),
      )) as typeof import('./render');

      // Render app using current context.
      renderStream(req, res, transformation);
    } catch (error) {
      // If an error is caught, let Vite fix the stacktrace so it maps back to
      // your actual source code.
      // @ts-expect-error -- Will fix later.
      vite.ssrFixStacktrace(error);
      next(error);
    }
  });

  app.listen(3000);
};

void createServer();
