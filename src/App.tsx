import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Cocktails } from "./components/Cocktails";
import { Sidebar } from "./components/Sidebar";
import { FavoritesCocktails } from "./components/FavoritesCocktails";
import { Login } from "./components/Auth/Login";
import { DetailCocktail } from "./components/DetailCocktail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <>
              <Sidebar />
              <Cocktails />
            </>
          }
        />
        <Route
          path="/favorites"
          element={
            <>
              <Sidebar />
              <FavoritesCocktails />
            </>
          }
        />
        <Route
          path="/details/:id"
          element={
            <>
              <Sidebar />
              <DetailCocktail />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
