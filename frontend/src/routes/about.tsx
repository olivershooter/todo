import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">About This Project</h2>
        <p className="mb-4">
          This Todo App is a portfolio project demonstrating full-stack
          development skills with React, TypeScript, and Django. It implements
          CRUD (Create, Read, Update, Delete) operations for managing notes.
        </p>
        <p>
          The app features user authentication, responsive design, and a clean
          UI. It's built with modern web development practices and showcases
          efficient state management and API integration.
        </p>
      </div>
    </div>
  );
}
