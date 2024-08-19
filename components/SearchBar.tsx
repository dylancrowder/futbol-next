import React from "react";

interface SearchBarProps {
  playerU: string;
  setPlayeru: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  playerU,
  setPlayeru,
  handleSearch,
}) => {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <input
        type="text"
        placeholder="Buscar jugador..."
        className="p-2 border border-gray-300 rounded-lg w-full max-w-xs" // Ajusta max-w-xs para que no ocupe demasiado espacio
        value={playerU}
        onChange={(e) => setPlayeru(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
