"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddTeam() {
  const [nameTeam, setNameTeam] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const trimmedNameTeam = nameTeam.trim();
    if (trimmedNameTeam === "") {
      setError("El nombre del equipo no puede estar vacío.");
      setIsSubmitting(false);
      return;
    }

    try {
      const lowerCaseNameTeam = trimmedNameTeam.toLowerCase();

      const response = await fetch("/api/add-team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: lowerCaseNameTeam }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear el equipo");
      }
      toast.success("Equipo creado correctamente");
      setNameTeam("");
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Agregar nuevo equipo</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={nameTeam}
            onChange={(e) => setNameTeam(e.target.value)}
            required
            placeholder="Escribe el nombre"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-blue-500 text-white w-full py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Enviando..." : "Agregar"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
