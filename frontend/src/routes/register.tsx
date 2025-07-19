import { createFileRoute } from "@tanstack/react-router";
import { LoginRegisterForm } from "../components/LoginRegisterForm";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return <LoginRegisterForm route="/api/user/register/" method="register" />;
}
