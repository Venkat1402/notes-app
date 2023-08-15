import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import MainScreen from "../../components/MainScreen/MainScreen";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { register } from "../../actions/userActions";

const RegisterScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push("/mynotes");
    }
  }, [history, userInfo]);

  const handleSubmit = async (event) => {
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
      setErrorMessage(
        "Password and Confirm Password dosen't match. Please try again."
      );
      return;
    }
    // TODO need to update profile picture functionality
    // sending constant URL instead of profile picture
    dispatch(
      register(
        name,
        email,
        password,
        "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG.png"
      )
    );
  };

  return (
    <MainScreen title="REGISTER">
      {loading && <LoadingSpinner />}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
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
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
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
