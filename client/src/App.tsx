import { QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { Account } from "./components/Account/Account";
import { queryClient } from "./api/queriClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <div className="app">
      <Account />
    </div>

    </QueryClientProvider>
  );
}

export default App;
