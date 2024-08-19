import Link from "next/link";
import { HomeIcon, UserIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/select-team"
          className="flex items-center space-x-2 hover:text-gray-400"
        >
          <HomeIcon className="h-6 w-6" />
          <span className="text-xl font-semibold">Inicio</span>
        </Link>
        <Link
          href="/"
          className="flex items-center space-x-2 hover:text-gray-400"
        >
          <UserIcon className="h-6 w-6" />
          <span className="text-xl font-semibold">Login</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
