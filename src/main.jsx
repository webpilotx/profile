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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-5xl font-bold mt-8">User Profile</h1>
      {user ? (
        <div className="mt-6 p-6 bg-gray-800 rounded-lg shadow-lg text-gray-400">
          {Object.entries(user).map(([key, value]) => (
            <p key={key}>
              <strong className="capitalize">{key}:</strong> {String(value)}
            </p>
          ))}
          <button
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
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
        <p className="mt-6 text-gray-500">No user information available.</p>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
