import { createFileRoute } from "@tanstack/react-router";
import { Quiz, TestModeContext } from "./index";

// Rota /teste — igual à home, mas com as setas de skip visíveis (só para testes).
export const Route = createFileRoute("/teste")({
  component: TesteComponent,
});

function TesteComponent() {
  return (
    <TestModeContext.Provider value={true}>
      <Quiz />
    </TestModeContext.Provider>
  );
}
