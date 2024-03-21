import React, { useState, useEffect } from 'react';
import AddSubject from "./components/AddSubject";
import ShowSubjects from "./components/ShowSubjects";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [subjects, setSubjects] = useState(
    JSON.parse(localStorage.getItem('subjects')) || []
  );

  useEffect(() => {
    localStorage.setItem('subjects', JSON.stringify(subjects));
  }, [subjects]);

  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <Routes>
            <Route path="/" element={<AddSubject subjects={subjects} setSubjects={setSubjects} />} />
            <Route path="/showSubjects" element={<ShowSubjects subjects={subjects} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;