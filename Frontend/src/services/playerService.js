// /src/services/playerService.js

let players = [
    { id: 1, name: 'Lionel Messi', position: 'Forward' },
    { id: 2, name: 'Cristiano Ronaldo', position: 'Forward' },
    { id: 3, name: 'Neymar Jr.', position: 'Forward' },
  ];
  
  export const getPlayers = () => {
    return [...players];
  };
  
  export const addPlayer = (player) => {
    player.id = players.length + 1;
    players.push(player);
  };
  
  export const deletePlayer = (id) => {
    players = players.filter(player => player.id !== id);
  };
  
  export const updatePlayer = (id, updatedPlayer) => {
    players = players.map(player => player.id === id ? { ...player, ...updatedPlayer } : player);
  };
  