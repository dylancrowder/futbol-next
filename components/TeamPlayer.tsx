import React from "react";
import Image from "next/image";
import { Player } from "@/types-calccio/types";

interface TeamPlayersListProps {
  players: Player[];
  teamName: string;
  handleTeamPlayer: any;
}

const TeamPlayersList: React.FC<TeamPlayersListProps> = ({
  players,
  teamName,
  handleTeamPlayer,
}) => {
  const handleDeletePlayer = async (playerName: string) => {
    try {
      const response = await fetch(
        `/api/delete-player/${teamName}/${playerName}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error deleting player");
      }

      handleTeamPlayer();
    } catch (error) {
      console.error("Failed to delete player:", error);
    }
  };

  return (
    <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Jugadores en el Equipo
      </h2>
      <ul>
        {players.map((player) => (
          <li
            key={player.player_name}
            className="mb-2 p-2 border-b border-gray-200 flex items-center justify-between"
          >
            <div className="flex items-center">
              <Image
                src={player.player_image}
                alt={`Imagen de ${player.player_name}`}
                width={40}
                height={40}
                className="rounded-full mr-4"
              />
              <div>
                <h3 className="font-semibold">{player.player_name}</h3>
                <p className="text-sm text-gray-600">
                  Edad: {player.player_age || "Desconocido"}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleDeletePlayer(player.player_name)}
              className="text-red-500 hover:text-red-700 transition border-2 border-black rounded-full p-2 flex items-center justify-center bg-white"
              aria-label="Eliminar jugador"
            >
              <span className="text-xl">🗑️</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamPlayersList;
