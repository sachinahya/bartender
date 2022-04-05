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

  return response.json() as Promise<T>;
};
