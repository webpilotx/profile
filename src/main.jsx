import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { importSPKI, jwtVerify } from "jose";
import "./index.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function verifyToken() {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const publicKey = await importSPKI(
          import.meta.env.VITE_PUBLIC_KEY,
          "RS256"
        );

        const { payload } = await jwtVerify(token, publicKey);
        setUser(payload); // Set the entire payload to the user state
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }

    verifyToken();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
      <nav className="w-full bg-white border-b border-gray-200 py-2 px-4 fixed top-0 left-0 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => (window.location.href = "/")}
          >
            Home
          </button>
        </div>
      </nav>
      <div className="mt-24 w-full max-w-lg px-6">
        <h1 className="text-2xl font-semibold text-center">User Profile</h1>
        {user ? (
          <div className="mt-6 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            {Object.entries(user).map(([key, value]) => (
              <p key={key} className="text-sm mb-2">
                <strong className="capitalize font-medium">{key}:</strong>{" "}
                {String(value)}
              </p>
            ))}
            <button
              className="mt-4 w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
              onClick={() => {
                localStorage.removeItem("token");
                setUser(null);
                window.location.href = "/auth"; // Redirect to /auth
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="mt-6 text-center text-gray-500 text-sm">
            No user information available.
          </p>
        )}
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
