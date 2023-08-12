import { Button, Container, Row } from "react-bootstrap";
import "./LandingPage.css";
import { useEffect } from "react";

const Landingpage = ({ history }) => {
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      history.push("/mynotes");
    }
  }, [history]);

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title display-3">
                <strong>Welcome to Notes app</strong>
              </h1>
              <h3 className="subtitle cc">One safe place for all your notes</h3>
            </div>
            <div className="buttonContainer">
              <a href="/login">
                <Button size="lg" className="landingButton">
                  Login
                </Button>
              </a>
              <a href="/register">
                <Button
                  size="lg"
                  className="landingButton"
                  variant="outline-primary"
                >
                  Sign up
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Landingpage;
