import { AsyncLocalStorage } from "node:async_hooks";

export const store = new AsyncLocalStorage();

export const setToStore = ({ key, obj }: { key: string; obj: object }) => {
  const storeData = (store.getStore() as Record<string, string>) || {};
  const old = getFromStore({ key });

  if (!old) {
    storeData[key] = JSON.stringify(obj);
  } else {
    storeData[key] = JSON.stringify({ ...old, ...obj });
  }

  store.enterWith(storeData);
};

export const getFromStore = ({ key }: { key: string }) => {
  const storeData = (store.getStore() as Record<string, string>) || {};
  const data = storeData[key];

  if (!data) {
    return {};
  }
  return JSON.parse(data);
};
