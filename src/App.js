import React from "react";
import Main from "./Main";
import { QueryClient, QueryClientProvider, } from "@tanstack/react-query";

export const queryClient = new QueryClient()

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  )
}
export default App