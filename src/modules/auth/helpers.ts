import { User } from "@firebase/auth";

export const transformUser = (user: User) =>
  user
    ? {
        _id: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      }
    : null;
