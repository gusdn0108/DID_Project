import Header from "./Header.jsx";

const Layout = ({ children, email }) => {
  return (
    <div>
      <Header children={children} email={email} />
      {children}
    </div>
  );
};

export default Layout;
