import { createFileRoute, redirect } from "@tanstack/react-router";
import { checkAuth } from "../utils/auth";
import { useState, useEffect } from "react";
import { LoadingIndicator } from "../components/LoadingIndicator";
import api from "../api/api";
import toast from "react-hot-toast";

export const Route = createFileRoute("/profile")({
  beforeLoad: async () => {
    if (!(await checkAuth())) {
      throw redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [username, setUsername] = useState("");
  const [totalNotes, setTotalNotes] = useState(0);
  const [lastNoteDate, setLastNoteDate] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = () => {
    setLoading(true);
    api
      .get("/api/user/stats/", { suppressToast: true })
      .then((res) => {
        console.log("con", res);
        setUsername(res.data.username);
        setTotalNotes(res.data.total_notes);
        setLastNoteDate(
          res.data.last_note_date
            ? res.data.last_note_date
            : "No notes made :(",
        );
        setRegistrationDate(res.data.registration_date);
      })
      .catch(() => toast.error("Failed to load user statistics"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold text-base-content mb-8">
        Your Profile
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">User Information</h2>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Username:</span>{" "}
                {username || "Loading..."}
              </p>
            </div>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Registration Date:</span>{" "}
                {registrationDate || "Loading..."}
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Your Notes Statistics</h2>
            {loading ? (
              <LoadingIndicator />
            ) : (
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Total Notes:</span>{" "}
                  {totalNotes}
                </p>
                {lastNoteDate && (
                  <p>
                    <span className="font-semibold">Last Created Note:</span>{" "}
                    {lastNoteDate}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
