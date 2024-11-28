// /src/components/PlayerList.js
 
import React, { useState, useEffect } from 'react';
import { getPlayers, deletePlayer, updatePlayer } from '../services/playerService';
import PlayerForm from './PlayerForm';
import { getCurrentUser, logout } from '../services/authService';
 
const PlayerList = () => {
  const [players, setPlayers] = useState(getPlayers());
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [user, setUser] = useState(null);
 
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);
 
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
 
  const handleLogout = () => {
    logout();
    setUser(null);
  };
 
  if (!user) {
    return <p>You are not logged in.</p>;
  }
 
  return (
<div>
<h1>Welcome, {user.name}</h1>
<p>Email: {user.email}</p>
<button onClick={handleLogout}>Logout</button>
<h2>Player List</h2>
<PlayerForm onSave={editingPlayer ? handleUpdatePlayer : handleAddPlayer} existingPlayer={editingPlayer} />
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