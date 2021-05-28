export const transformUser = (user) =>
  user
    ? {
        _id: user.uid,
        emailVerified: user.emailVerified,
        displayName: user.displayName,
        email: user.email,
        phone: user.phoneNumber,
        photo: user.photoURL,
        refreshToken: user.refreshToken,
      }
    : null;
