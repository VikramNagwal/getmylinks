import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import { Routes, Route } from "react-router-dom";

export default function App() {

  return (
    <>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </MainLayout>
    </>
  );
}
