import { createFileRoute, redirect } from "@tanstack/react-router";
import { checkAuth } from "../utils/auth";

export const Route = createFileRoute("/profile")({
  beforeLoad: async () => {
    if (!(await checkAuth())) {
      throw redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/profile"!</div>;
}
