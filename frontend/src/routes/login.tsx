import { createFileRoute } from "@tanstack/react-router";
import { LoginRegisterForm } from "../components/LoginRegisterForm";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return <LoginRegisterForm route={"/api/token/"} method="login" />;
}
