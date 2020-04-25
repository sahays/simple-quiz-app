import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Emoji from "../controls/Emoji";
import { useHistory } from "react-router-dom";
import { StorageUtil } from "../utils/StorageUtil";
import { Hub } from "@aws-amplify/core";
import RandomUtil from "../utils/RandomUtil";

const MainNavbar = () => {
  const { deleteItem } = StorageUtil();
  const { getRandomNumbers } = RandomUtil();
  const history = useHistory();
  const [firstName, setFirstName] = useState(null);
  const key = "userAttrs";
  const [canNavigate, setCanNavigate] = useState(null);

  useEffect(() => {
    const { readItem } = StorageUtil();
    Hub.listen("signup-channel", (data) => {
      const { payload } = data;
      if (payload.message === "signed-up") {
        console.log("setting name");
        setFirstName(readItem(key).firstName);
      }
    });
  }, []);

  useEffect(() => {
    console.log(canNavigate);
    if (canNavigate) {
      history.push("/");
    }
  }, [canNavigate, history]);

  useEffect(() => {
    const { hasItem, readItem } = StorageUtil();
    if (hasItem(key)) {
      setFirstName(readItem(key).firstName);
    } else {
      setCanNavigate(true);
    }
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
        {firstName && (
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end">
            <Navbar.Text className="pr-3">
              <Emoji icon="🤓" />
              Welcome, {firstName}
            </Navbar.Text>
            <Nav>
              <Link
                to="#"
                className="pr-3"
                onClick={() => {
                  try {
                    deleteItem(key);
                    setCanNavigate(getRandomNumbers());
                    setFirstName(null);
                  } catch (e) {
                    console.log(e);
                  }
                }}>
                Sign out
              </Link>
            </Nav>
          </Navbar.Collapse>
        )}
      </Navbar>
      <div className="mb-3"></div>
    </React.Fragment>
  );
};

export default MainNavbar;
