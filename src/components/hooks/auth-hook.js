import { useCallback, useState, useEffect } from "react";
export const useAuth = () => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userName, setuserName] = useState("");
  let logoutTimer;
  const login = useCallback((uid, name, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    setuserName(name);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        name: name,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("userData");
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setuserName(null);
  }, []);
  //!auto login-logout

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      console.log(remainingTime);
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);
  //! check the localstoarge and re render loggedin user
  let storeData;
  useEffect(() => {
    storeData = JSON.parse(localStorage.getItem("userData"));
    if (
      storeData &&
      storeData.token &&
      new Date(storeData.expiration) > new Date()
    ) {
      login(
        storeData.userId,
        storeData.name,
        storeData.token,
        new Date(storeData.expiration)
      );
    }
  }, [login]);

  return { token, userId, login, logout, userName };
};
