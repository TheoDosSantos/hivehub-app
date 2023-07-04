import Header from "./header";

export default function Layout({ children }) {
  let action = true;
  if (children[1].props.className.includes('login') || children[1].props.className.includes('register')) {
    action = false;
  }
  else{
    action = true;
  }
  return (
    <>
      <Header action={action} />
      <main>{children}</main>
    </>
  );
}
