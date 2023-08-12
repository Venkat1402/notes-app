import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import MainScreen from "../../components/MainScreen/MainScreen";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    console.log(name, email, password, confirmPassword, profilePicture);
    event.preventDefault();
    setValidated(true);
    setErrorMessage("");
    if (
      event.target[0].value === "" ||
      event.target[1].value === "" ||
      event.target[2].value === "" ||
      event.target[3].value === ""
    ) {
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords dosen't match. Please try again.");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      setLoading(true);
      const { data } = await axios.post(
        "/api/users",
        { name, email, password, profilePicture },
        config
      );
      console.log("data", JSON.stringify(data));
      localStorage.setItem("userInfo", JSON.stringify(data));

      setLoading(false);
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setValidated(false);
      setLoading(false);
    }
  };

  return (
    <MainScreen title="REGISTER">
      {loading && <LoadingSpinner />}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group md="4" controlId="validationName" className="mb-3">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            please enter your correct password.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group md="4" controlId="validationEmail" className="mb-1">
          <Form.Label>Email Address</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              aria-describedby="inputGroupPrepend"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your correct email address.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group md="4" controlId="validationPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            please enter your correct password.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          md="4"
          controlId="validationConfirmPassword"
          className="mb-3"
        >
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            required
            value={confirmPassword}
            onChange={(e) => {
              setErrorMessage("");
              return setConfirmPassword(e.target.value);
            }}
          />
          <Form.Control.Feedback type="invalid">
            please enter your correct password.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group md="1" controlId="formFile" className="mb-3">
          <Form.Label>Profile Picture (optional)</Form.Label>
          <Form.Control
            type="file"
            placeholder="Profile Picture"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" className="mb-3">
          Submit form
        </Button>
      </Form>
      <Row>
        <Col>
          Already have an account ? <Link to="/login">Login Here</Link>
        </Col>
      </Row>
    </MainScreen>
  );
};

export default RegisterScreen;
