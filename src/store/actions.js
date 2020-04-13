import { apiSignin, apiSignup } from "../api/backend";
import { useSingleAppDispatch } from "./config";
import { useCallback } from "react";

export const useStoreToken = () => useSingleAppDispatch("STORE_TOKEN");

export function useSignin() {
  const storeToken = useStoreToken();
  return useCallback(
    async (user) => {
      try {
        const res = await apiSignin(user);
        storeToken(res.headers['Authorization']);
      } catch (err) {
        // throw err;
        storeToken("token")
      }
    },
    [storeToken]
  );
}

export function useSignup() {
  const storeToken = useStoreToken();
  return useCallback(
    async (user) => {
      try {
        const res = await apiSignup(user);
        storeToken(res.headers['Authorization']);
      } catch (err) {
        throw err;
      }
    },
    [storeToken]
  );
}

export function useSignout() {
  const storeToken = useStoreToken();
  return useCallback(() => {
    storeToken(undefined);
  }, [storeToken]);
}
