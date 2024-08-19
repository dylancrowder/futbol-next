import React from "react";
import Image from "next/image";
import { Player } from "@/types-calccio/types";

interface PlayerListProps {
  players: Player[];
  handleAddPlayer: (player: Player) => void;
  title?: string;
  emptyMessage?: string;
}

const PlayerList: React.FC<PlayerListProps> = ({
  players,
  handleAddPlayer,
  title = "Lista de Jugadores",
  emptyMessage = "Busca el nombre de un jugador",
}) => {
  return (
    <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4 mb-8">
      {title && (
        <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
      )}
      <ul>
        {Array.isArray(players) && players.length > 0 ? (
          players.map((player, key) => (
            <li
              key={key}
              className="mb-2 p-2 border-b border-gray-200 flex items-center justify-between"
            >
              <div className="flex items-center">
                <Image
                  src={player.player_image}
                  alt={player.player_name}
                  width={40}
                  height={40}
                  className="rounded-full mr-4"
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
              </div>
              <button
                className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={() => handleAddPlayer(player)}
              >
                Agregar
              </button>
            </li>
          ))
        ) : (
          <div className="text-center">{emptyMessage}</div>
        )}
      </ul>
    </div>
  );
};

export default PlayerList;
