import "@/styles/common/reset.scss";

import { UserProvider } from "context/userContext";

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
