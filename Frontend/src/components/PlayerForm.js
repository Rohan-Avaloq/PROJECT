// /src/components/PlayerForm.js
 
import React, { useState, useEffect } from 'react';
 
const PlayerForm = ({ onSave, existingPlayer }) => {
  // State to store input values for player name and position
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
 
  // If there's an existing player, populate the form with their data
  useEffect(() => {
    if (existingPlayer) {
      setName(existingPlayer.name);
      setPosition(existingPlayer.position);
    }
  }, [existingPlayer]);
 
  // Handle form submission (either add or update)
  const handleSubmit = (e) => {
    e.preventDefault();
 
    // Ensure name and position are not empty
    if (!name || !position) {
      alert("Both name and position are required!");
      return;
    }
 
    const player = { name, position };
    onSave(player);  // Call the onSave function passed as a prop (either add or update player)
    // Clear the form after saving
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