import { useState, DependencyList, useEffect, useRef, useCallback } from "@tarojs/taro";


export type AsyncState<T> =
  | {
      loading: boolean;
      error?: undefined;
      value?: undefined;
    }
  | {
      loading: false;
      error: Error;
      value?: undefined;
    }
  | {
      loading: false;
      error?: undefined;
      value: T;
    }


export type AsyncFn<Result = any, Args extends any[] = any[]> = [
  AsyncState<Result>,
  (...args: Args | []) => Promise<Result>
]

export function useMountedState(): () => boolean {
  const mountedRef = useRef<boolean>(false);
  const get = useCallback(() => mountedRef.current, []);
  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    }
  })
  return get
}


export function useAsyncFn<Result = any, Args extends any[] = any[]>(
  fn: (...args: Args | []) => Promise<Result>,
  deps: DependencyList = [],
  initialState: AsyncState<Result> = { loading: false }
): AsyncFn<Result, Args> {
  const lastCallId = useRef(0);
  const [state, set] = useState<AsyncState<Result>>(initialState);

  const isMounted = useMountedState();

  const callback = useCallback((...args: Args | []) => {
    const callId = ++lastCallId.current;
    set({ loading: true });

    return fn(...args).then(
      value => {
        isMounted() &&
          callId === lastCallId.current &&
          set({ value, loading: false });

        return value;
      },
      error => {
        isMounted() &&
          callId === lastCallId.current &&
          set({ error, loading: false });

        return error;
      }
    );
  }, deps);

  return [state, callback];
}

export function useAsync<Result = any, Args extends any[] = any[]>(
  fn: (...args: Args | []) => Promise<Result>,
  deps: DependencyList = []
) {
  const [state, callback] = useAsyncFn<Result, Args>(fn, deps, {
    loading: true
  });

  useEffect(() => {
    callback();
  }, [callback]);

  return state;
}
