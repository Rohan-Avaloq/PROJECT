// const dummyPlayerData = [
//   {
//     id: 1,
//     name: "John Doe",
//     age: 25,
//     team: "Team A",
//     position: "Forward",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     age: 28,
//     team: "Team B",
//     position: "Midfielder",
//   },
//   {
//     id: 3,
//     name: "Bob Johnson",
//     age: 22,
//     team: "Team A",
//     position: "Defender",
//   },
//   // More players can be added here
// ];

// let nextId = 4;

// export const PlayerService = {
//   getAllPlayers: () => {
//     return new Promise((resolve) => {
//       setTimeout(() => resolve(dummyPlayerData), 1000);
//     });
//   },

//   getPlayerById: (id) => {
//     return new Promise((resolve, reject) => {
//       const player = dummyPlayerData.find((player) => player.id === id);
//       if (player) {
//         resolve(player);
//       } else {
//         reject("Player not found");
//       }
//     });
//   },

//   createPlayer: (newPlayer) => {
//     return new Promise((resolve) => {
//       newPlayer.id = nextId++;
//       dummyPlayerData.push(newPlayer);
//       setTimeout(() => resolve(newPlayer), 1000);
//     });
//   },

//   updatePlayer: (id, updatedPlayer) => {
//     return new Promise((resolve, reject) => {
//       const playerIndex = dummyPlayerData.findIndex((player) => player.id === id);
//       if (playerIndex !== -1) {
//         dummyPlayerData[playerIndex] = { ...dummyPlayerData[playerIndex], ...updatedPlayer };
//         setTimeout(() => resolve(dummyPlayerData[playerIndex]), 1000);
//       } else {
//         reject("Player not found");
//       }
//     });
//   },

//   deletePlayer: (id) => {
//     return new Promise((resolve, reject) => {
//       const playerIndex = dummyPlayerData.findIndex((player) => player.id === id);
//       if (playerIndex !== -1) {
//         dummyPlayerData.splice(playerIndex, 1);
//         setTimeout(() => resolve(id), 1000);
//       } else {
//         reject("Player not found");
//       }
//     });
//   },
// };




const API_BASE_URL = "https://localhost:5000";  // Use https for secure connection

export const PlayerService = {
  getAllPlayers: async () => {
    const response = await fetch(`${API_BASE_URL}/players`, {
      // Allow insecure content from localhost for development purposes
      // In production, ensure proper SSL certificate is used to avoid this.
      // `mode: 'no-cors'` may not be necessary if the server is configured with CORS
      // correctly.
      headers: {
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch players.");
    }
    return await response.json();
  },

  getPlayerById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/players/${id}`, {
      headers: {
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Player not found.");
    }
    return await response.json();
  },

  createPlayer: async (newPlayer) => {
    const response = await fetch(`${API_BASE_URL}/players`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlayer),
    });
    if (!response.ok) {
      throw new Error("Failed to create player.");
    }
    return await response.json();
  },

  updatePlayer: async (id, updatedPlayer) => {
    const response = await fetch(`${API_BASE_URL}/players/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPlayer),
    });
    if (!response.ok) {
      throw new Error("Failed to update player.");
    }
    return await response.json();
  },

  deletePlayer: async (id) => {
    const response = await fetch(`${API_BASE_URL}/players/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete player.");
    }
    return await response.json();
  },
};





