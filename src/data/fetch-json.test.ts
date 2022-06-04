import fetchMock from 'fetch-mock';

import { FetchError, fetchJson } from './fetch-json';

it('fetches and returns JSON data', async () => {
  fetchMock.mock('http://some_url', { a: 1 });

  const data = await fetchJson('http://some_url');

  expect(data).toEqual({
    a: 1,
  });
});

it('throws a FetchError when the response is not ok', async () => {
  fetchMock.mock('http://some_url', 404);

  await expect(fetchJson('http://some_url')).rejects.toThrow(expect.any(FetchError) as FetchError);
});

it('throws when JSON parsing fails', async () => {
  fetchMock.mock('http://some_url', '{ "badJson', {
    sendAsJson: true,
  });

  await expect(fetchJson('http://some_url')).rejects.toThrow(expect.any(Error) as Error);
});
