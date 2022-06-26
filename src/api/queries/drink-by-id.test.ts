import { renderHook, waitFor } from '@testing-library/react';

import * as fetchJson from '../../data/fetch-json';
import { delay } from '../../utils';

import { useDrinkQuery, useMatchedDrinkQuery } from './drink-by-id';
import { createWrapper, MockQueryClient } from './test-helpers';

it('calls the correct endpoint', () => {
  const fetchJsonSpy = jest.spyOn(fetchJson, 'fetchJson');

  renderHook(() => useDrinkQuery({ id: '23' }), {
    wrapper: MockQueryClient,
  });

  expect(fetchJsonSpy).toHaveBeenCalledOnce();
  expect(fetchJsonSpy).toHaveBeenCalledWith(
    'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=23',
  );
});

it('calls the correct endpoint with params retrieved from route match', async () => {
  const fetchJsonSpy = jest.spyOn(fetchJson, 'fetchJson');

  renderHook(() => useMatchedDrinkQuery(), {
    wrapper: createWrapper({
      path: '/:id',
      initialEntry: '/23',
    }),
  });

  await waitFor(() => expect(fetchJsonSpy).toHaveBeenCalledOnce());
  expect(fetchJsonSpy).toHaveBeenCalledWith(
    'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=23',
  );
});

it('does not call the endpoint when route does not match', async () => {
  const fetchJsonSpy = jest.spyOn(fetchJson, 'fetchJson');

  renderHook(() => useMatchedDrinkQuery(), {
    wrapper: createWrapper({
      path: '/',
      initialEntry: '/',
    }),
  });

  await delay(500);

  expect(fetchJsonSpy).not.toHaveBeenCalled();
});
