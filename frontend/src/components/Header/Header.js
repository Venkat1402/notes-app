import React from "react";
import {
  Container,
  Form,
  FormControl,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/">Notes app</Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                // onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
          </Nav>
          <Nav>
            <>
              <Nav.Link>
                <Link to="/mynotes">My Notes</Link>
              </Nav.Link>
              <NavDropdown title={`Venkat`} id="collasible-nav-dropdown">
                <NavDropdown.Item href="/profile">
                  {/* <img
                    alt=""
                    src={`${userInfo.pic}`}
                    width="25"
                    height="25"
                    style={{ marginRight: 10 }}
                  /> */}
                  My Profile
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => {
                    localStorage.removeItem("userInfo");
                    history.push("/");
                  }}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </>
            <Nav.Link>
              <Link to="/login">Login</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
