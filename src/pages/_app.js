import { useEffect, useState, useContext } from "react";
import { useRouter } from 'next/router';
import { UserProvider, UserContext } from "context/userContext";

import "@/styles/common/reset.scss";
import "@/styles/common/calendar.scss";

export default function App({ Component, pageProps }) {
  
  const router = useRouter();
  const { isAuth } = useContext(UserContext);

  useEffect(() => {
    if (!isAuth) {
      router.push("/");
    }
  }, []);

  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
