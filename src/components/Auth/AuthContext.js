import React, { createContext } from "react";

export const authContext = createContext({
  isLoggedin: false,
  userId: null,
  userName: null,
  token: null,
  login: () => {},
  logout: () => {},
});
