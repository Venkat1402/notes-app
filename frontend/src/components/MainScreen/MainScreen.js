import React from "react";
import "./MainScreen.css";
import { Container, Row } from "react-bootstrap";

const MainScreen = ({ title, children }) => {
  return (
    <div className="mainBackground">
      <Container>
        <Row>
          <div className="page">
            {title && (
              <>
                <h1 className="heading display-5">{title}</h1>
                <hr />
              </>
            )}
            {children}
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default MainScreen;
