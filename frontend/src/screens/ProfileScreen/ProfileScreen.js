import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import MainScreen from "../../components/MainScreen/MainScreen";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { updateProfile } from "../../actions/userActions";
import "./ProfileScreen.css";

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setProfilePicture(userInfo.profilePicture);
    }
  }, [history, userInfo]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidated(true);
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage(
        "Password and Confirm Password dosen't match. Please try again."
      );
      return;
    }
    dispatch(updateProfile({ name, email, password, profilePicture }));
  };

  return (
    <MainScreen title="Edit Profile">
      {loading && <LoadingSpinner />}
      {success && (
        <ErrorMessage variant="success">Updated Successfully</ErrorMessage>
      )}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Row className="profileContainer">
        <Col md={6}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group md="4" controlId="validationName" className="mb-3">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
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
                required={password !== ""}
                placeholder="Enter Password"
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
            {/* <Form.Group md="1" controlId="formFile" className="mb-3">
              <Form.Label>Profile Picture (optional)</Form.Label>
              <Form.Control
                type="file"
                placeholder="Profile Picture"
                value={profilePicture}
                onChange={(e) => setProfilePicture(e.target.value)}
              />
            </Form.Group> */}

            <Button type="submit" className="mb-3">
              Submit form
            </Button>
          </Form>
        </Col>
        <Col
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={profilePicture} alt={name} className="profilePic" />
        </Col>
      </Row>
    </MainScreen>
  );
};

export default ProfileScreen;
