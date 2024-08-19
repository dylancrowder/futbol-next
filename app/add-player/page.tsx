"use client";
import { useState, useEffect, useCallback } from "react";
import { Player } from "@/types-calccio/types";
import SearchBar from "@/components/SearchBar";
import ErrorMessage from "@/components/ErrorMessaje";
import PlayerList from "@/components/Player.List";
import TeamPlayersList from "@/components/TeamPlayer";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddPlayer() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [teamPlayers, setTeamPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [playerU, setPlayeru] = useState<string>("");
  const [errorSearch, setErrorSearch] = useState(false);
  const [teamName, setTeamName] = useState<string>("");

  const fetchPlayers = useCallback(async () => {
    try {
      setLoading(true);
      setErrorSearch(false);

      const response = await fetch(
        `https://apiv3.apifootball.com/?action=get_players&player_name=${playerU}&APIkey=82ddc4ed96adb0a718108ee0c7b8b5cbeabf2552cc3087e3d572dcc9bea5237a`
      );

      if (!response.ok) {
        setErrorSearch(true);
        return;
      }

      const data: any = await response.json();
      if (Array.isArray(data)) {
        setPlayers(data);
      } else {
        setErrorSearch(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }, [playerU]);

  const handleTeamPlayer = useCallback(async () => {
    if (!teamName) return;

    try {
      const response = await fetch(`/api/find-team-players/${teamName}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const actualTeams = await response.json();

      setTeamPlayers(actualTeams.players);
    } catch (error) {}
  }, [teamName]);

  useEffect(() => {
    handleTeamPlayer();
  }, [handleTeamPlayer]);

  useEffect(() => {
    const { searchParams } = new URL(window.location.href);
    const teamNameParam = searchParams.get("team");
    if (teamNameParam) {
      setTeamName(teamNameParam);
    } else {
      setTeamName("");
    }
  }, []);

  const handleSearch = () => {
    setLoading(true);
    fetchPlayers();
  };

  const handleAddPlayer = async (player: Player) => {
    const playerSend = {
      player_name: player.player_name,
      player_id: player.player_id,
      player_image: player.player_image,
      player_country: player.player_country,
      player_age: player.player_age,
    };

    if (teamPlayers.length < 5 && teamName) {
      try {
        const response = await fetch(`/api/add-players/${teamName}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(playerSend),
        });

        if (!response.ok) {
          const errorData = await response.json();
          alert(errorData.message || "Error adding player");
          return;
        }

        const updatedTeam = await response.json();

        handleTeamPlayer();

        toast.success("Jugador agregado correctamente!");
      } catch (error) {
        alert("An unexpected error occurred.");
      }
    } else {
      setError(
        "El equipo ya tiene 5 jugadores o no se ha especificado un equipo."
      );
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-screen bg-gray-50 p-8">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6">Lista de Jugadores</h1>

      <SearchBar
        playerU={playerU}
        setPlayeru={setPlayeru}
        handleSearch={handleSearch}
      />

      {errorSearch && <ErrorMessage message="Error en la búsqueda" />}
      {error && <ErrorMessage message={error} />}

      {loading ? (
        <div>Cargando jugadores...</div>
      ) : (
        <>
          <PlayerList players={players} handleAddPlayer={handleAddPlayer} />

          <TeamPlayersList
            players={teamPlayers}
            teamName={teamName}
            handleTeamPlayer={handleTeamPlayer}
          />
        </>
      )}
    </div>
  );
}
