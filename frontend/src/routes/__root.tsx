import {
  createRootRoute,
  Link,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useAuth } from "../context/AuthContext";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <div className="p-4">
        <p>Not found!</p>
        <Link to="/" className="link link-primary mt-2">
          Go home
        </Link>
      </div>
    );
  },
});

function RootComponent() {
  const navigate = useNavigate();
  const { isAuthenticated, setAuthenticated } = useAuth();

  const logout = () => {
    localStorage.clear();
    setAuthenticated(false);
    navigate({ to: "/login" });
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow-md rounded-box mb-4">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            App Logo
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

            {/* Authentication-conditional links */}
            {isAuthenticated ? (
              <li>
                <button onClick={logout} className="btn btn-primary">
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

      <div className="container mx-auto px-4">
        <Outlet />
      </div>

      <div className="mt-8 text-center text-sm text-base-content/70">
        © 2023 My App
      </div>

      <TanStackRouterDevtools />
    </>
  );
}
