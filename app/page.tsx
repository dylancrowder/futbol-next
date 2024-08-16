// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [userName, setUserName] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedId = localStorage.getItem("userId");
    if (storedName && storedId) {
      setUserName(storedName);
      setUserId(storedId);
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    router.push("/login");
  };

  const handleContinue = () => {
    router.push("/select-team");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 custom-body">
      <div className="bg-white p-10 rounded-lg shadow-lg w-1/2 text-center h-full">
        {userName && (
          <>
            <h1 className="text-2xl font-bold mb-4">Bienvenido, {userName}!</h1>
            <div className="flex justify-center gap-4 mb-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 w-48"
              >
                Salir
              </button>
              <button
                onClick={handleContinue}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-green-600 w-48"
              >
                Continuar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
