"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SelectTeam() {
  const [cantidad, setCantidad] = useState(false);
  const [allTeamsReady, setAllTeamsReady] = useState(false);
  const [buttonAdd, setButtonAdd] = useState(false);
  const router = useRouter();

  const team1 = {
    nombre: "Argentina",
    jugadores: [
      "messi",
      "depaul",
      "roberto carlos",
      "juancruz gonzales",
     
    ],
  };
  const team2 = {
    nombre: "Bolivia",
    jugadores: ["edison mamani", "el verduras", "boliviano"],
  };

  const teams: any = [team1];

  useEffect(() => {
    const hasTeams = teams.length > 0;
    setCantidad(hasTeams);

    const allComplete =
      teams.length > 0 &&
      teams.every((team: any) => team.jugadores.length === 5);

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
                className="bg-white rounded-lg shadow-lg p-8 flex flex-col justify-between h-full border border-gray-200"
              >
                <div>
                  <h3 className="text-2xl font-bold text-white bg-blue-700 p-4 rounded-lg text-center">
                    {team.nombre}
                  </h3>
                  <ul className="mt-8 space-y-4 text-gray-800 text-xl font-semibold">
                    {team.jugadores.map((jugador: any, jIndex: any) => (
                      <li
                        key={jIndex}
                        className={`p-2 rounded-lg ${
                          jIndex % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                        }`}
                      >
                        {jIndex + 1}. {jugador}
                      </li>
                    ))}
                  </ul>
                </div>
                {team.jugadores.length < 5 ? (
                  <button
                    onClick={() => handleAddPlayer(team.nombre)}
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
