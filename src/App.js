import { useSelector } from 'react-redux';
import './App.css';
import CreateProject from './pages/CreateProject';
import CreateLabels from './pages/CreateLabels';

import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const getUser = useSelector((state) => state);
  console.log(getUser)
  return (
    <div className="App">
      <Routes>
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/" element={<Navigate to="/create-project" />} />
          <Route path="/label-images" element={<CreateLabels />} />
      </Routes>
    </div>
  );
}

export default App;


