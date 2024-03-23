import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchParams from "./Components/SearchParams";
import Details from "./Components/Details";

const App = () => {
  return (
    <BrowserRouter>
      <h1>Adopt Me!</h1>
      <Routes>
        <Route path="/" element={<SearchParams />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
