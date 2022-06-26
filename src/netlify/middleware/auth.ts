import { Unauthorized } from 'http-errors';
import jwt, { VerifyOptions } from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

import { Middleware } from './common';

export interface AuthMiddlewareOptions {
  optional?: boolean;
}

const client = jwksClient({
  jwksUri: `https://${process.env.VITE_DOMAIN || ''}/.well-known/jwks.json`,
});

const verify = (token: string, secret: string, options: VerifyOptions): Promise<jwt.Jwt> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, { ...options, complete: true }, (err, jwt) => {
      if (err) {
        reject(err);
      }

      resolve(jwt as jwt.Jwt);
    });
  });
};

export const auth = ({ optional }: AuthMiddlewareOptions = {}): Middleware => {
  return {
    before: async ({ event }) => {
      if (event.httpMethod.toUpperCase() !== 'OPTIONS') {
        const token = (event.headers.authorization || event.headers.Authorization)?.replace(
          /Bearer /,
          '',
        );

        if (!token && !optional) {
          throw new Unauthorized('No token supplied');
        }

        if (token) {
          const decodedToken = jwt.decode(token, { complete: true });
          const kid = decodedToken?.header.kid;

          if (!kid) {
            throw new Unauthorized('No kid present on token');
          }

          const secret = await client.getSigningKey(kid);
          const publicKey = secret.getPublicKey();

          try {
            const { payload } = await verify(token, publicKey, {
              audience: process.env.VITE_AUDIENCE,
              issuer: `https://${process.env.VITE_DOMAIN || ''}/`,
              algorithms: ['RS256'],
            });

            event.auth = payload as jwt.JwtPayload;
          } catch (error) {
            // eslint-disable-next-line no-console -- Captured by Netlify logs.
            console.error(error);
            throw new Unauthorized('JWT validation failed');
          }
        }
      }
    },
  };
};
