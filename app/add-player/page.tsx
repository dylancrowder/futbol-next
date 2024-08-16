"use client";
import { useState, useEffect, useCallback } from "react";

import { Player } from "@/types-calccio/types";
import SearchBar from "@/components/SearchBar";
import ErrorMessage from "@/components/ErrorMessaje";
import PlayerList from "@/components/Player.List";
import TeamPlayersList from "@/components/TeamPlayer";

export default function AddPlayer() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [topScorers, setTopScorers] = useState<Player[]>([]);
  const [teamPlayers, setTeamPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [playerU, setPlayeru] = useState<string>("L. Messi");
  const [errorSearch, setErrorSearch] = useState(false);

  const fetchPlayers = useCallback(async () => {
    try {
      setLoading(true);
      setErrorSearch(false);

      const response = await fetch(
        `https://apiv3.apifootball.com/?action=get_players&player_name=${playerU}&APIkey=82ddc4ed96adb0a718108ee0c7b8b5cbeabf2552cc3087e3d572dcc9bea5237a`
      );

      if (!response.ok) {
        setErrorSearch(true);
        setPlayers([]);
        return;
      }

      const data: any = await response.json();
      if (Array.isArray(data)) {
        setPlayers(data);
      } else {
        setErrorSearch(true);
        setPlayers([]);
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

  const fetchTopScorers = async () => {
    try {
      const response = await fetch(
        `https://apiv3.apifootball.com/?action=get_topscorers&league_id=302&APIkey=82ddc4ed96adb0a718108ee0c7b8b5cbeabf2552cc3087e3d572dcc9bea5237a`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: any = await response.json();
      if (Array.isArray(data)) {
        setTopScorers(data);
      } else {
        setError("Invalid data format for top scorers.");
        setTopScorers([]);
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
  };

  useEffect(() => {
    fetchTopScorers();
  }, []);

  const handleSearch = () => {
    setLoading(true);
    fetchPlayers();
  };

  const handleAddPlayer = (player: Player) => {
    if (teamPlayers.length < 5) {
      setTeamPlayers([...teamPlayers, player]);
    } else {
      alert("El equipo ya tiene 5 jugadores");
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-screen bg-gray-50 p-8">
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
          <PlayerList
            players={topScorers}
            handleAddPlayer={handleAddPlayer}
            title="Top Scorers"
            emptyMessage="No hay goleadores disponibles"
          />
          <TeamPlayersList players={teamPlayers} />
        </>
      )}
    </div>
  );
}
