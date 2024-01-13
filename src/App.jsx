import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/admin/home/Home";
import Login from "./pages/admin/login/Login";
import { ProtectedRoutes } from "./services/ProtectedRouter";
import CreateExperience from "./pages/admin/createExperience/CreateExperience";
import Character from "./pages/admin/createExperience/applicationForms/character/Character";
import Modal3D from "./pages/admin/createExperience/applicationForms/3d-modal/Modal3D";
import Image360 from "./pages/admin/createExperience/applicationForms/360-image/Image360";
import Assessment from "./pages/admin/createExperience/applicationForms/assessment/Assessment";

function App() {
  return (
    <div className="layout_wrapper">
      <div className="layout">
        <Routes>
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/home" element={<Home />} />
            {/* Create Experience Route */}
            <Route path="/create-experience" element={<CreateExperience />} />
            <Route path="/character" element={<Character />} />
            <Route path="/3d-modal" element={<Modal3D />} />
            <Route path="/360-image" element={<Image360 />} />
            <Route path="/assessment" element={<Assessment />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
