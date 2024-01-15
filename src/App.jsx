import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/admin/home/Home";
import Login from "./pages/admin/login/Login";
import { ProtectedRoutes } from "./services/ProtectedRouter";
import CreateExperience from "./pages/admin/createExperience/CreateExperience";
import Character from "./pages/admin/createExperience/applicationForms/character/Character";
import Modal3D from "./pages/admin/createExperience/applicationForms/3d-modal/Modal3D";
import Assessment from "./pages/admin/createExperience/applicationForms/assessment/Assessment";
import Video360 from "./pages/admin/createExperience/applicationForms/360-video/video360";

function App() {
  return (
    <div className="layout_wrapper">
      <div className="layout">
        <Routes>
          <Route  element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
            {/* Create Experience Route */}
            <Route path="/create-experience" element={<CreateExperience />} />
            <Route path="/character" element={<Character />} />
            <Route path="/3d-model" element={<Modal3D />} />
            <Route path="/360-video" element={<Video360 />} />
            <Route path="/assessment" element={<Assessment />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
