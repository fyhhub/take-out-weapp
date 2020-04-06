import { useState, DependencyList, useEffect, useRef, useCallback, useRouter, useDidShow } from "@tarojs/taro";
import { useSelector } from '@/store'
import { useDispatch } from '@tarojs/redux'
import { setUserInfo, getAddressList } from "@/store/actions";
import Taro from '@tarojs/taro'
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
  initialState: AsyncState<Result> = { loading: false },
  loadingText?: string,
  successText?: string,
  successCallback?: Function
): AsyncFn<Result, Args> {
  const lastCallId = useRef(0);
  const [state, set] = useState<AsyncState<Result>>(initialState);

  const isMounted = useMountedState();

  const callback = useCallback((...args: Args | []) => {
    const callId = ++lastCallId.current;
    set({ loading: true });
    if (loadingText) {
      Taro.showLoading({
        title: loadingText
      })
    }
    return fn(...args).then(
      value => {
        isMounted() &&
          callId === lastCallId.current &&
          set({ value, loading: false });
        if (loadingText) {
          Taro.hideLoading()
        }
        if (successText) {
          Taro.showToast({
            title: successText,
            icon: 'success',
            duration: 2000
          }).then(() => {
            successCallback && successCallback()
          })
        }
        return value;
      },
      error => {
        isMounted() &&
          callId === lastCallId.current &&
          set({ error, loading: false });
        if (loadingText) {
          Taro.hideLoading()
        }
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



export function useAuth() {
  const userinfo = useSelector(state => state.user.userinfo)
  const dispatch = useDispatch()
  const user = Taro.getStorageSync('userInfo')
  useDidShow(() => {
    if (Object.keys(userinfo).length > 0) {
      return
    }
    if (user) {
      Taro.checkSession({
        success() {
          dispatch(setUserInfo(JSON.parse(user)))
        },
        fail: () => {
          Taro.navigateTo({ url: '/pages/Auth/index' })
        }
      })
    } else {
      Taro.navigateTo({ url: '/pages/Auth/index' })
    }
  })
}

export function useInitByRouter<T>(initState) {
  const router = useRouter()
  const [data, setData] = useState<T>(initState)
  useEffect(() => {
    setData(initState)
  }, [router.params])

  return data
}
