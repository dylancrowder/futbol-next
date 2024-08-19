"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SelectTeam() {
  const [teams, setTeams] = useState<any[]>([]);
  const [cantidad, setCantidad] = useState(false);
  const [allTeamsReady, setAllTeamsReady] = useState(false);
  const [buttonAdd, setButtonAdd] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await fetch("/api/add-team", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Error fetching teams");
        }
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchTeams();
  }, []);

  useEffect(() => {
    const hasTeams = teams.length > 0;
    setCantidad(hasTeams);

    const allComplete =
      teams.length > 0 && teams.every((team: any) => team.players.length === 5);

    const bothTeamsReady = teams.length === 2 && allComplete;
    setAllTeamsReady(bothTeamsReady);

    setButtonAdd(teams.length < 2);
  }, [teams]);

  const handleContinue = () => {
    router.push("/add-team");
  };

  const handleAddTeam = () => {
    router.push("/add-team");
  };

  const handleAddPlayer = (teamName: any) => {
    router.push(`/add-player?team=${teamName}`);
  };

  const handleDeletePlayer = async (teamName: any, playerName: any) => {
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

      const updatedTeams = teams.map((team) =>
        team.name === teamName
          ? {
              ...team,
              players: team.players.filter(
                (player: any) => player.player_name !== playerName
              ),
            }
          : team
      );
      setTeams(updatedTeams);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTeam = async (teamName: any) => {
    try {
      const response = await fetch(`/api/removeTeam/${teamName}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error deleting team");
      }

      setTeams(teams.filter((team) => team.name !== teamName));
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfigureTeam = (teamName: any) => {
    router.push(`/configure-team?team=${teamName}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-xl text-gray-700">Cargando equipos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full h-screen bg-gray-50 p-8">
      {cantidad ? (
        <div className="w-full flex flex-col my-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
            Equipos disponibles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full my-8">
            {teams.map((team: any, index: any) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-8 flex flex-col justify-between h-full border-2 border-gray-200 rounded-lg"
              >
                {/* aca */}

                <div className="flex items-center justify-between border-2 border-black rounded-lg p-4 bg-gray-900">
                  <h3 className="text-2xl font-bold text-white text-center">
                    {team.name}
                  </h3>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleConfigureTeam(team.name)}
                      className="text-gray-500 hover:text-gray-700 transition p-2 border-2 border-black rounded-full flex items-center justify-center bg-white"
                    >
                      <span className="text-xl">⚙️</span>
                    </button>
                    <button
                      onClick={() => handleDeleteTeam(team.name)}
                      className="text-red-500 hover:text-red-700 transition border-2 border-black rounded-full p-2 flex items-center justify-center bg-white"
                    >
                      <span className="text-xl">🗑️</span>
                    </button>
                  </div>
                </div>
                {/* aca */}
                <ul className="mt-8 space-y-4 text-gray-800 text-xl font-semibold">
                  {team.players.map((jugador: any, jIndex: any) => (
                    <li
                      key={jIndex}
                      className={`p-2 flex justify-between items-center rounded-lg ${
                        jIndex % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                      } border-2 border-gray-200 rounded-lg`}
                    >
                      <span>
                        {jugador.player_name ? jugador.player_name : jugador}
                      </span>
                      <button
                        onClick={() =>
                          handleDeletePlayer(team.name, jugador.player_name)
                        }
                        className="text-red-500 hover:text-red-700 transition border-2 border-black rounded-full p-2 flex items-center justify-center"
                      >
                        <span className="text-xl">🗑️</span>
                      </button>
                    </li>
                  ))}
                </ul>
                {team.players.length < 5 ? (
                  <button
                    onClick={() => handleAddPlayer(team.name)}
                    className="mt-6 bg-green-500 text-white text-lg font-medium py-3 px-6 rounded-md hover:bg-green-600 transition duration-300"
                  >
                    Agregar jugador
                  </button>
                ) : (
                  <p className="mt-8 text-xl text-green-600 font-bold text-center">
                    Equipo completo
                  </p>
                )}
              </div>
            ))}

            {!allTeamsReady && buttonAdd && (
              <button
                onClick={handleAddTeam}
                className="w-full bg-gray-500 text-white text-lg font-medium py-3 px-6 rounded-md hover:bg-gray-600 transition duration-300"
              >
                Agregar otro equipo
              </button>
            )}
          </div>
          {allTeamsReady && (
            <p className="text-xl text-green-600 font-semibold text-center">
              ¡Ambos equipos están listos!
            </p>
          )}
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            No existe ningún equipo
          </h2>
          <button
            onClick={handleContinue}
            className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
          >
            Agregar nuevo equipo
          </button>
        </div>
      )}
    </div>
  );
}
