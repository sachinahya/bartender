import { useEffect, useState } from 'react';

export const usePromise = <T>(promise: Promise<T>): [T?] => {
  const [result, setResult] = useState<T>();

  useEffect(() => {
    void promise.then((data) => setResult(data));
  });

  return [result];
};
