import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
} from "react";
import { reducer } from "./reducer";
import * as types from "./types";

const initialState = {
  contacts: Array(20).fill({
    firstName: "Joseph",
    lastName: "Edache",
    email: "josedache0@gmail.com",
    address: "Durumi",
    phoneNumber: "938849400384",
  }),
};

export const StoreContext = createContext();
const { Provider } = StoreContext;

export function StoreProvider(props) {
  const store = useCreateStore();
  return <Provider value={store}>{props.children}</Provider>;
}

export default StoreProvider;

export function useCreateStore() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
}

export function useAppStore() {
  return useContext(StoreContext);
}

export const defaultSelector = (state) => state;

/**
 * @template T
 * @param {(state: any) => T} selector
 */
export function useAppState(selector = defaultSelector) {
  const { state } = useAppStore();
  return useMemo(() => selector(state), [selector, state]);
}

export function useAppDispatch() {
  const { dispatch } = useAppStore();
  return dispatch;
}

/**
 * @param  {...(keyof typeof types)} actions
 */
export function useMultiAppDispatch(...actions) {
  const dispatch = useAppDispatch();
  return useMemo(
    () => actions.map((type) => (payload) => dispatch({ type, payload })),
    [actions, dispatch]
  );
}

/**
 * @param {keyof typeof types} type
 */
export function useSingleAppDispatch(type) {
  const dispatch = useAppDispatch();
  return useCallback((payload) => dispatch({ type, payload }), [
    dispatch,
    type,
  ]);
}
