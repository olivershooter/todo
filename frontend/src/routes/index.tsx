import { createFileRoute, redirect } from "@tanstack/react-router";
import { checkAuth } from "../utils/auth";
import { useState, useEffect } from "react";
import { MdEditNote } from "react-icons/md";

import { Note } from "../components/Note";
import { NoteProp } from "../types/notes";
import { LoadingIndicator } from "../components/LoadingIndicator";
import api from "../api/api";
import toast from "react-hot-toast";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    if (!(await checkAuth())) {
      throw redirect({ to: "/login" });
    }
  },
  component: Index,
});

function Index() {
  const [notes, setNotes] = useState<NoteProp[]>([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    setLoading(true);
    api
      .get("/api/notes/", { suppressToast: true })
      .then((res) => setNotes(res.data))
      .catch(() => toast.error("Failed to load notes"))
      .finally(() => setLoading(false));
  };

  const createNote = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingNote(true);
    setLoading(true);

    api
      .post(
        "/api/notes/",
        { content, title },
        { successMessage: "Created a note!" },
      )
      .then(() => getNotes())
      .catch(() => toast.error("Failed to make note"))
      .finally(() => {
        setIsCreatingNote(false);
        setLoading(false);
      });
  };

  const deleteNote = (id: number) => {
    setLoading(true);
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          toast.success("Note deleted successfully!");
        }
        getNotes();
      })
      .catch(() => toast.error("Failed to delete note"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-base-content">Notes</h1>
        <div className="bg-primary/10 text-primary rounded-full px-4 py-1">
          {notes.length} notes
        </div>
      </div>

      {/* Notes Creation Form */}
      <div className="card bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title flex items-center mb-4">
            <MdEditNote className="text-secondary mr-2" />
            Create New Note
          </h2>

          <form onSubmit={createNote} className="space-y-4">
            <div className="form-control">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note title"
                className="input input-ghost text-xl font-bold w-full focus:outline-none"
                required
              />
            </div>

            <div className="form-control">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your thoughts here..."
                className="textarea textarea-ghost text-base min-h-[150px] w-full focus:outline-none"
                required
              />
            </div>

            <div className="form-control">
              <button
                type="submit"
                className={`btn btn-primary ${isCreatingNote ? "loading" : ""}`}
                disabled={isCreatingNote || loading}
              >
                {!isCreatingNote && "Create Note"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {loading && <LoadingIndicator />}

      {notes.length === 0 ? (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <MdEditNote className="text-5xl text-base-content/30" />
          </div>
          <h3 className="text-xl text-base-content/70">
            No notes yet. Create your first one!
          </h3>
        </div>
      ) : (
        notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))
      )}
    </div>
  );
}
