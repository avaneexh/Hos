import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import MenuPage from "./pages/MenuPage";

function App() {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MenuPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
