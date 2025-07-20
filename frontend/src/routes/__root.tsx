import {
  createRootRoute,
  Link,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";
import toast, { Toaster } from "react-hot-toast";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-base-100 to-base-200 p-4">
        <div className="text-center">
          <div className="text-9xl mb-4">😢</div>
          <h1 className="text-4xl font-bold text-base-content mb-2">
            404 - Page Not Found
          </h1>
          <p className="text-lg text-base-content mb-8">
            Oops! The page you're looking for doesn't exist.
          </p>
          <Link to="/" className="btn btn-primary">
            Go Back Home
          </Link>
        </div>
      </div>
    );
  },
});

function RootComponent() {
  const navigate = useNavigate();
  const { isAuthenticated, setAuthenticated } = useAuth();

  const logout = () => {
    localStorage.clear();
    toast.success("Logged out.");
    setAuthenticated(false);
    navigate({ to: "/login" });
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow-md rounded-box mb-4 font-bold">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            <img src={logo} width={40} height={40} />
          </Link>
        </div>

        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/" className="[&.active]:text-primary">
                Home
              </Link>
            </li>

            <li>
              <Link to="/profile" className="[&.active]:text-primary">
                Profile
              </Link>
            </li>

            <li>
              <Link to="/about" className="[&.active]:text-primary">
                About
              </Link>
            </li>

            {isAuthenticated ? (
              <li>
                <button onClick={logout} className="btn btn-primary ml-8">
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login" className="[&.active]:text-primary">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="[&.active]:text-primary">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 font-mono">
        <Outlet />
      </div>

      <footer>
        <div className="mt-8 mb-8 text-center text-sm text-base-content/70">
          Made by Ollie 🤖
        </div>
      </footer>

      <TanStackRouterDevtools />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </>
  );
}
