// /src/components/PlayerList.js

import React, { useState, useEffect } from 'react';
import { getPlayers, deletePlayer, updatePlayer, addPlayer } from '../services/playerService';
import PlayerForm from './PlayerForm';
import './PlayerList.css';  // Import the CSS file for this component

const PlayerList = () => {
  const [players, setPlayers] = useState(getPlayers());
  const [editingPlayer, setEditingPlayer] = useState(null);

  const handleAddPlayer = (player) => {
    addPlayer(player);
    setPlayers(getPlayers());
  };

  const handleDeletePlayer = (id) => {
    deletePlayer(id);
    setPlayers(getPlayers());
  };

  const handleEditPlayer = (player) => {
    setEditingPlayer(player);
  };

  const handleUpdatePlayer = (updatedPlayer) => {
    updatePlayer(editingPlayer.id, updatedPlayer);
    setPlayers(getPlayers());
    setEditingPlayer(null);
  };

  return (
    <div>
      <h1>Player List</h1>
      <PlayerForm
        onSave={editingPlayer ? handleUpdatePlayer : handleAddPlayer}
        existingPlayer={editingPlayer}
      />
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            {player.name} - {player.position}
            <button onClick={() => handleEditPlayer(player)}>Edit</button>
            <button onClick={() => handleDeletePlayer(player.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
