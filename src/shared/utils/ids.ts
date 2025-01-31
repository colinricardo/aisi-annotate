import { customAlphabet } from "nanoid";
import { v4 as uuidv4 } from "uuid";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const SIZE = 16;
const SIZE_BIG = 48;

const nanoid = customAlphabet(ALPHABET, SIZE);
const _nanoid = customAlphabet(ALPHABET, SIZE_BIG);

export enum IdPrefix {
  User = "user_", // this is set by clerk anyway

  Document = "doc_",
  Correlation = "cor_",

  Block = "block_",
}

export const randomId = ({ prefix }: { prefix?: IdPrefix }) => {
  if (!prefix) {
    return randomUuid();
  }

  return `${prefix}${nanoid()}`;
};

export const randomUuid = () => {
  return uuidv4();
};
