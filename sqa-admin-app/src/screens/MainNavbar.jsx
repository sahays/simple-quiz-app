import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import Emoji from "../controls/Emoji";

const MainNavbar = () => {
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      const {
        attributes: { given_name },
      } = await Auth.currentAuthenticatedUser();
      setFirstName(given_name);
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
          <Nav>
            <Link to="/questions" className="pr-3">
              <Emoji icon="🤔" />
              Questions
            </Link>
          </Nav>
          <Nav>
            <Link to="/quizzes" className="pr-3">
              <Emoji icon="🏁" />
              Quizzes
            </Link>
          </Nav>
          <Navbar.Text className="pr-3">
            <Emoji icon="🤓" />
            Welcome, {firstName}
          </Navbar.Text>
          <Nav>
            <Link to="#" className="pr-3" onClick={() => Auth.signOut()}>
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
