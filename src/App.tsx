import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Search } from "./components/Search";
import { Sidebar } from "./components/Sidebar";
import { FavoritesRecipes } from "./components/FavoritesRecipes";
import { Login } from "./components/Auth/Login";
import { DetailRecipe } from "./components/DetailRecipe";

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/search" element={<Search />} />
        <Route path="/favorites" element={<FavoritesRecipes />} />
        <Route path="/details/:id" element={<DetailRecipe />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
