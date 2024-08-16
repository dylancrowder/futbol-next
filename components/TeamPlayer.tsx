import React from "react";
import { Player } from "@/types-calccio/types";

interface TeamPlayersListProps {
  players: Player[];
}

const TeamPlayersList: React.FC<TeamPlayersListProps> = ({ players }) => {
  return (
    <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4">Jugadores en el Equipo</h2>
      <ul>
        {players.map((player) => (
          <li
            key={player.player_id}
            className="mb-2 p-2 border-b border-gray-200 flex items-center"
          >
            <img
              src={player.player_image}
              alt={player.player_name}
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>
              <h2 className="font-semibold">{player.player_name}</h2>
              <p className="text-sm text-gray-600">
                Goles: {player.player_goals}
              </p>
              <p className="text-sm text-gray-600">
                Equipo: {player.team_name}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamPlayersList;
