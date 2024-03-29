import fetch, { RequestInfo, RequestInit, Response } from 'node-fetch';

export class FetchError extends Error {
  readonly response: Response;

  constructor(response: Response) {
    super('Response was not ok');
    this.response = response;
    this.name = 'FetchError';
  }
}

export const fetchJson = async <T>(input: RequestInfo, init?: RequestInit): Promise<T> => {
  const response = await fetch(input, init);

  if (!response.ok) {
    throw new FetchError(response);
  }

  const json = (await response.json()) as T;
  return json;
};
