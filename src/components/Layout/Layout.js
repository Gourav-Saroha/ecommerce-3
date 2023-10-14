import React from "react";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";

const Layout = (props) => {
  return (
    <>
      <Navigation />
      <div className="h-auto min-h-[80vh]">{props.children}</div>
      <Footer />
    </>
  );
};

export default Layout;
