import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

export const UserContext = createContext({
  isAuth: false,
  login: (info) => {},
  logout: () => {},
});

export const UserProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const router = useRouter();

  const login = (info) => {
    setIsAuth(true);
    setUserInfo(info);
  };

  const  logout = async() => {
    setIsAuth(false);
    setUserInfo({});
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/logout`, {
      method: "POST",
      credentials: "include",
    });
    router.push("/");

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
