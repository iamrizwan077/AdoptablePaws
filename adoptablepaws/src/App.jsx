import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchParams from "./Components/SearchParams";
import Details from "./Components/Details";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App = () => {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30, // From React Query version 5, gcTime is used instead of cacheTime
      },
    }
});

  return (
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <h1>Adopt Me!</h1>
      <Routes>
        <Route path="/" element={<SearchParams />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
