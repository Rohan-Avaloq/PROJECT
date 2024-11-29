import React, { useState, useEffect } from "react";
import { PlayerService } from "../services/playerService";
import { Container, Button, Table, Modal, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [players, setPlayers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState({
    id: "",
    name: "",
    age: "",
    team: "",
    position: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    PlayerService.getAllPlayers().then(setPlayers).catch(setError);
  }, []);

  const handleCreateOrUpdatePlayer = () => {
    const playerData = {
      name: currentPlayer.name,
      age: currentPlayer.age,
      team: currentPlayer.team,
      position: currentPlayer.position,
    };

    if (isEditing) {
      PlayerService.updatePlayer(currentPlayer.id, playerData)
        .then((updatedPlayer) => {
          const updatedPlayers = players.map((player) =>
            player.id === updatedPlayer.id ? updatedPlayer : player
          );
          setPlayers(updatedPlayers);
          setShowModal(false);
        })
        .catch(setError);
    } else {
      PlayerService.createPlayer(playerData)
        .then((newPlayer) => {
          setPlayers([...players, newPlayer]);
          setShowModal(false);
        })
        .catch(setError);
    }
  };

  const handleDeletePlayer = (id) => {
    PlayerService.deletePlayer(id)
      .then(() => {
        const updatedPlayers = players.filter((player) => player.id !== id);
        setPlayers(updatedPlayers);
      })
      .catch(setError);
  };

  const openModalForCreate = () => {
    setIsEditing(false);
    setCurrentPlayer({ id: "", name: "", age: "", team: "", position: "" });
    setShowModal(true);
  };

  const openModalForEdit = (player) => {
    setIsEditing(true);
    setCurrentPlayer(player);
    setShowModal(true);
  };

  const handleLogout = () => {
    navigate("/"); // Redirect to login page
  };

  return (
    <Container>
      <h2>Admin Panel - Manage Players</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="success" onClick={openModalForCreate} className="mb-3">
        Add Player
      </Button>
      <Button variant="secondary" onClick={handleLogout} className="mb-3 ml-2">
        Logout
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Team</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>{player.age}</td>
              <td>{player.team}</td>
              <td>{player.position}</td>
              <td>
                <Button variant="warning" onClick={() => openModalForEdit(player)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDeletePlayer(player.id)} className="ml-2">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Player" : "Add Player"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={currentPlayer.name}
                onChange={(e) => setCurrentPlayer({ ...currentPlayer, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                value={currentPlayer.age}
                onChange={(e) => setCurrentPlayer({ ...currentPlayer, age: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Team</Form.Label>
              <Form.Control
                type="text"
                value={currentPlayer.team}
                onChange={(e) => setCurrentPlayer({ ...currentPlayer, team: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                value={currentPlayer.position}
                onChange={(e) => setCurrentPlayer({ ...currentPlayer, position: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateOrUpdatePlayer}>
            {isEditing ? "Update Player" : "Create Player"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminPage;
