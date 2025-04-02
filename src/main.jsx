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
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <nav className="w-full bg-muted p-4 shadow-sm fixed top-0 left-0">
        <div className="container mx-auto flex justify-between items-center">
          <button
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
            onClick={() => (window.location.href = "/")}
          >
            Home
          </button>
        </div>
      </nav>
      <div className="mt-20">
        {" "}
        {/* Add margin to avoid overlap with fixed navbar */}
        <h1 className="text-4xl font-semibold mt-8">User Profile</h1>
        {user ? (
          <div className="mt-6 p-6 bg-card rounded-lg shadow-md text-card-foreground">
            {Object.entries(user).map(([key, value]) => (
              <p key={key} className="text-sm">
                <strong className="capitalize">{key}:</strong> {String(value)}
              </p>
            ))}
            <button
              className="mt-4 px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 focus:outline-none focus:ring-2 focus:ring-destructive/50"
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
          <p className="mt-6 text-muted-foreground text-sm">
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
