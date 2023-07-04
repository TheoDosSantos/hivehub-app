import { createContext, useState } from 'react';

export const UserContext = createContext({
  isAuth: false,
  login: (info) => {},
  logout: () => {},
});

export const UserProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const login = (info) => {
    setIsAuth(true);
    setUserInfo(info);
  };

  const logout = () => {
    setIsAuth(false);
    setUserInfo({});
  };

  return (
    <UserContext.Provider value={{ isAuth, userInfo, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
