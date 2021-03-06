import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import Emoji from "../controls/Emoji";
// import { StorageUtil } from "../utils/StorageUtil";

const MainNavbar = () => {
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    // const { createItem } = StorageUtil();
    const loadUser = async () => {
      const user = await Auth.currentAuthenticatedUser();
      const attrs = user.attributes;
      setFirstName(attrs.given_name);
      // createItem("userinfo", user);
    };

    loadUser();
  }, []);

  return (
    <React.Fragment>
      <Navbar bg="light" expand="lg" variant="light">
        <Navbar.Brand>
          <Link to="/" className="lead nav-links">
            <Emoji icon="💯" />
            Simple Quiz Service
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Navbar.Text className="pr-3">
            <Emoji icon="🤓" />
            Welcome, {firstName}
          </Navbar.Text>
          <Nav>
            <Link to="/" className="pr-3" onClick={() => Auth.signOut()}>
              Sign out
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="mb-3"></div>
    </React.Fragment>
  );
};

export default MainNavbar;
