import { renderHook } from '@testing-library/react';

import * as fetchJson from '../../data/fetch-json';

import { useCategoriesQuery } from './list-categories';
import { MockQueryClient } from './test-helpers';

it('calls the correct endpoint', () => {
  const fetchJsonSpy = jest.spyOn(fetchJson, 'fetchJson');

  renderHook(() => useCategoriesQuery(), {
    wrapper: MockQueryClient,
  });

  expect(fetchJsonSpy).toHaveBeenCalledOnce();
  expect(fetchJsonSpy).toHaveBeenCalledWith(
    'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=23',
  );
});
