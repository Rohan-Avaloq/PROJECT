import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container, Alert } from "react-bootstrap";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Dummy login validation
    if (username === "admin" && password === "admin123") {
      navigate("/admin"); // Redirect to Admin Dashboard
    } else if (username === "player" && password === "player123") {
      navigate("/player-details"); // Redirect to Player Details page
    } else {
      setError("Invalid login credentials");
    }
  };

  return (
    <Container>
      <h2>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </Form.Group>
        <Button onClick={handleLogin} variant="primary" className="mt-3">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
