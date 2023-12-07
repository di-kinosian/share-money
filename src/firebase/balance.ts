import { remove } from "firebase/database";
import { IBalanceDetails } from "./types";
import { getBalanceRef, getUserBalanceRef } from "./refs";

export const deleteBalance = async (balance: IBalanceDetails) => {
  const userIds = Object.keys(balance.users)
  await Promise.all(userIds.map(async (uid) => {
    await remove(getUserBalanceRef(uid, balance.id))
  }));
  await remove(getBalanceRef(balance.id))
}