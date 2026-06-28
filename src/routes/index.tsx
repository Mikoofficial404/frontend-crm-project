import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Mulai dari Scratch</h1>
      <p className="mt-4 text-muted-foreground">
        Silakan bangun dashboard kamu di sini!
      </p>
    </div>
  );
}
