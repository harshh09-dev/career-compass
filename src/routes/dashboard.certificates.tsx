import { createFileRoute } from "@tanstack/react-router";
import { Award } from "lucide-react";
import { Stub } from "./dashboard.training";

export const Route = createFileRoute("/dashboard/certificates")({
  component: () => <Stub title="Certificates" icon={Award} desc="A grid of your earned certificates with download actions." />,
});
