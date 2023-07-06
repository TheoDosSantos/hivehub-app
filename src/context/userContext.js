import { createContext, useState, useEffect } from "react";

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

  useEffect(() => {
    const currentUser = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/log/current`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        login(data);
      } else {
        logout();
      }
    };
    currentUser();
  }, []);

  return (
    <UserContext.Provider value={{ isAuth, userInfo, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
