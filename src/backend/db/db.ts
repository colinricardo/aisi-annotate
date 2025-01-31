import documentGetters from "@backend/db/getters/document";
import userGetters from "@backend/db/getters/user";
import documentSetters from "@backend/db/setters/document";
import userSetters from "@backend/db/setters/user";

export const getters = {
  document: documentGetters,
  user: userGetters,
};

export const setters = {
  document: documentSetters,
  user: userSetters,
};

export const db = {
  getters,
  setters,
};
