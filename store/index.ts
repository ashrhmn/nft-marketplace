import { atom } from "recoil";
import { TransactionState } from "@usedapp/core";

export const buyNftStateRecoilState = atom<TransactionState | null>({
  key: "buyNftState",
  default: null,
});
