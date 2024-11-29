const dummyPlayerData = [
  {
    id: 1,
    name: "John Doe",
    age: 25,
    team: "Team A",
    position: "Forward",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 28,
    team: "Team B",
    position: "Midfielder",
  },
  {
    id: 3,
    name: "Bob Johnson",
    age: 22,
    team: "Team A",
    position: "Defender",
  },
  // More players can be added here
];

let nextId = 4;

export const PlayerService = {
  getAllPlayers: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(dummyPlayerData), 1000);
    });
  },

  getPlayerById: (id) => {
    return new Promise((resolve, reject) => {
      const player = dummyPlayerData.find((player) => player.id === id);
      if (player) {
        resolve(player);
      } else {
        reject("Player not found");
      }
    });
  },

  createPlayer: (newPlayer) => {
    return new Promise((resolve) => {
      newPlayer.id = nextId++;
      dummyPlayerData.push(newPlayer);
      setTimeout(() => resolve(newPlayer), 1000);
    });
  },

  updatePlayer: (id, updatedPlayer) => {
    return new Promise((resolve, reject) => {
      const playerIndex = dummyPlayerData.findIndex((player) => player.id === id);
      if (playerIndex !== -1) {
        dummyPlayerData[playerIndex] = { ...dummyPlayerData[playerIndex], ...updatedPlayer };
        setTimeout(() => resolve(dummyPlayerData[playerIndex]), 1000);
      } else {
        reject("Player not found");
      }
    });
  },

  deletePlayer: (id) => {
    return new Promise((resolve, reject) => {
      const playerIndex = dummyPlayerData.findIndex((player) => player.id === id);
      if (playerIndex !== -1) {
        dummyPlayerData.splice(playerIndex, 1);
        setTimeout(() => resolve(id), 1000);
      } else {
        reject("Player not found");
      }
    });
  },
};
