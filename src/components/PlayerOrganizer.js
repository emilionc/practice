import React, { useState } from 'react';

function PlayerForm({ onSubmit }) {
  const [playerName, setPlayerName] = useState('');
  const [playerHandicap, setPlayerHandicap] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim() === '' || playerHandicap.trim() === '') {
      alert("Both player name and handicap are required.");
      return;
    }
    const parsedHandicap = parseFloat(playerHandicap);
    if (isNaN(parsedHandicap)) {
      alert("Handicap must be a number.");
      return;
    }
    onSubmit({ name: playerName, handicap: parsedHandicap });
    setPlayerName('');
    setPlayerHandicap('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Player Name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Handicap"
        value={playerHandicap}
        onChange={(e) => setPlayerHandicap(e.target.value)}
      />
      <button type="submit">Add Player</button>
    </form>
  );
}

function PlayerOrganizer() {
  const [players, setPlayers] = useState([]);
  const [groups, setGroups] = useState({ group1: [], group2: [] });

  const organizePlayers = (playerData) => {
    if (players.length >= 8) {
      alert("You have already added 8 players. Cannot add more.");
      return;
    }

    setPlayers([...players, playerData]);
  };

  const balanceGroups = (players) => {
    // Sort the players by their handicap.
    const sortedPlayers = [...players].sort((a, b) => a.handicap - b.handicap);

    const group1 = [];
    const group2 = [];

    let sumGroup1 = 0;
    let sumGroup2 = 0;

    // Distribute players to balance the sum of handicaps in each group.
    for (let i = 0; i < sortedPlayers.length; i++) {
      if (sumGroup1 <= sumGroup2) {
        group1.push(sortedPlayers[i]);
        sumGroup1 += sortedPlayers[i].handicap;
      } else {
        group2.push(sortedPlayers[i]);
        sumGroup2 += sortedPlayers[i].handicap;
      }
    }

    return { group1, group2 };
  };

  const handleOrganize = () => {
    if (players.length < 8) {
      alert("Not enough players. Need at least 8 players.");
    } else {
      const { group1, group2 } = balanceGroups(players);

      setGroups({ group1, group2 });
    }
  };

  return (
    <div>
      <h1>Player Organizer</h1>
      <PlayerForm onSubmit={organizePlayers} />
      <button onClick={handleOrganize}>Organize Players</button>

      {players.length > 0 && (
        <div>
          <h2>Players:</h2>
          <ul>
            {players.map((player, index) => (
              <li key={index}>{`${player.name} (Handicap: ${player.handicap})`}</li>
            ))}
          </ul>
        </div>
      )}

      {groups.group1.length > 0 && (
        <div>
          <h2>Group 1:</h2>
          <ul>
            {groups.group1.map((player, index) => (
              <li key={index}>{`${player.name} (Handicap: ${player.handicap})`}</li>
            ))}
          </ul>
        </div>
      )}

      {groups.group2.length > 0 && (
        <div>
          <h2>Group 2:</h2>
          <ul>
            {groups.group2.map((player, index) => (
              <li key={index}>{`${player.name} (Handicap: ${player.handicap})`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PlayerOrganizer;
