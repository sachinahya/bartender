import { ApiClient, useApiClient } from '../client';

export interface ApiContext {
  store: ApiClient;
}

export const useApiContext = (): ApiContext => {
  return {
    store: useApiClient(),
  };
};
