import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Cocktails } from "./components/Cocktails";
import { Sidebar } from "./components/Sidebar";
import { FavoritesCocktails } from "./components/FavoritesCocktails";
import { Login } from "./components/Auth/Login";
import { DetailCocktail } from "./components/DetailCocktail";

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route index element={<Cocktails />} />
        <Route path="/favorites" element={<FavoritesCocktails />} />
        <Route path="/details/:id" element={<DetailCocktail />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
