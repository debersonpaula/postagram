import { useEffect, useState } from 'react';

export function useLogicPromises<T>(promiseCallback: () => Promise<T>): LogicPromises<T> {
  const [state, setState] = useState<LogicPromises<T>>({
    isLoading: false,
    isCompleted: false,
    isFailed: false,
  });

  useEffect(() => {
    setState({ isLoading: true, isCompleted: false, isFailed: false });
    promiseCallback()
      .then((result) => {
        setState({ isLoading: false, isCompleted: true, isFailed: false, result });
      })
      .catch(() => {
        setState({ isLoading: false, isCompleted: false, isFailed: true });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}

interface LogicPromises<T> {
  isLoading: boolean;
  isCompleted: boolean;
  isFailed: boolean;
  result?: T;
}
