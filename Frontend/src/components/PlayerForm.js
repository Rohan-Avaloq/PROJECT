// /src/components/PlayerForm.js

import React, { useState, useEffect } from 'react';
import './PlayerForm.css';  // Import the CSS file for this component

const PlayerForm = ({ onSave, existingPlayer }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');

  useEffect(() => {
    if (existingPlayer) {
      setName(existingPlayer.name);
      setPosition(existingPlayer.position);
    }
  }, [existingPlayer]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !position) {
      alert("Both name and position are required!");
      return;
    }

    const player = { name, position };
    onSave(player);

    setName('');
    setPosition('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Position:</label>
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
      </div>
      <button type="submit">
        {existingPlayer ? 'Update Player' : 'Add Player'}
      </button>
    </form>
  );
};

export default PlayerForm;
