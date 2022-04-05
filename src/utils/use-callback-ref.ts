import { useCallback, useState } from 'react';

export const useCallbackRef = <T>(): [T | null, (instance: T | null) => void] => {
  const [state, setState] = useState<T | null>(null);

  const setInstance = useCallback((instance: T | null) => {
    setState(instance);
  }, []);

  return [state, setInstance];
};
