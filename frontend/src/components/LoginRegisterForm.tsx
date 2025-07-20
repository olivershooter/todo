import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/api";
import { FaUser, FaLock, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { LoadingIndicator } from "./LoadingIndicator";
import api from "../api/api";
import toast from "react-hot-toast";

export const LoginRegisterForm = ({
  route,
  method,
}: {
  route: string;
  method: string;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { setAuthenticated } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post(
        route,
        { username, password },
        { suppressSuccessToast: true },
      );

      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        setAuthenticated(true);
        toast.success("Logged in");
        navigate({ to: "/" });
      } else {
        // On registration
        toast.success("Successfully created an account");
        navigate({ to: "/login" });
      }
    } catch (error) {
      toast.error("Failed");
    } finally {
      setLoading(false);
    }
  };

  const name = method === "login" ? "Login" : "Register";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-100 to-base-200 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl overflow-hidden border border-base-200">
        <div className="card-body">
          <div className="flex justify-center mb-6">
            <div className="bg-primary p-3 rounded-full">
              {method === "login" ? (
                <FaSignInAlt className="text-primary-content text-2xl" />
              ) : (
                <FaUserPlus className="text-primary-content text-2xl" />
              )}
            </div>
          </div>

          <h1 className="card-title justify-center text-2xl font-bold text-base-content mb-8">
            {name}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content">Username</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content/50">
                  <FaUser />
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="input input-bordered pl-10 w-full bg-base-100 text-base-content placeholder:text-base-content/40"
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content">Password</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content/50">
                  <FaLock />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input input-bordered pl-10 w-full bg-base-100 text-base-content placeholder:text-base-content/40"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
                disabled={loading}
              >
                {!loading && (
                  <span className="flex items-center justify-center">
                    {method === "login" ? (
                      <>
                        <FaSignInAlt className="mr-2" /> Log In
                      </>
                    ) : (
                      <>
                        <FaUserPlus className="mr-2" /> Register
                      </>
                    )}
                  </span>
                )}
                {loading ? <LoadingIndicator /> : ""}
              </button>
            </div>
          </form>

          <div className="divider my-6 text-base-content">OR</div>

          <p className="text-center text-sm text-base-content">
            {method === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <a
              className="link link-secondary"
              onClick={() =>
                navigate({ to: method === "login" ? "/register" : "/login" })
              }
            >
              {method === "login" ? "Register here" : "Login here"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
