import './App.css';
import CreateProject from './pages/CreateProject';
import CreateLabels from './pages/CreateLabels';

import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="w-screen h-screen bg-backColor overflow-y-scroll">
      <Routes>
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/" element={<Navigate to="/create-project" />} />
          <Route path="/label-images" element={<CreateLabels />} />
      </Routes>
    </div>
  );
}

export default App;


