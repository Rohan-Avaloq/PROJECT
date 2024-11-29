import React, { useEffect, useState } from "react";
import { PlayerService } from "../services/playerService";
import { Container, Card, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PlayerDetails = () => {
  const [player, setPlayer] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Dummy player ID - should be dynamic based on login
    const playerId = 1; // For example purposes, we use player with ID 1

    PlayerService.getPlayerById(playerId)
      .then(setPlayer)
      .catch(setError);
  }, []);

  const handleLogout = () => {
    navigate("/"); // Redirect to login page
  };

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Container>
      <h2>Your Details</h2>
      {player ? (
        <Card>
          <Card.Body>
            <Card.Title>{player.name}</Card.Title>
            <Card.Text>Age: {player.age}</Card.Text>
            <Card.Text>Team: {player.team}</Card.Text>
            <Card.Text>Position: {player.position}</Card.Text>
            <Button onClick={handleLogout}>Logout</Button>
          </Card.Body>
        </Card>
      ) : (
        <Alert variant="info">Loading...</Alert>
      )}
    </Container>
  );
};

export default PlayerDetails;
