import React, { useState, useEffect } from 'react';
import AddSubject from "./components/AddSubject";
import ShowSubjects from "./components/ShowSubjects";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddQuestions from './components/AddQuestions';
import ShowQuestions from './components/ShowQuestions';

function App() {
  const [subjects, setSubjects] = useState(
    JSON.parse(localStorage.getItem('subjects')) || []
  );

  useEffect(() => {
    localStorage.setItem('subjects', JSON.stringify(subjects));
  }, [subjects]);
  const [questions, setQuestions] = useState(
    JSON.parse(localStorage.getItem('questions')) || []
  );

  useEffect(() => {
    localStorage.setItem('questions', JSON.stringify(questions));
  }, [questions]);
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <Routes>
            <Route path="/" element={<AddSubject subjects={subjects} setSubjects={setSubjects} />} />
            <Route path="/showSubjects" element={<ShowSubjects subjects={subjects} />} />
            <Route path="/addQuestions" element={<AddQuestions subjects={subjects} questions={questions} setQuestions={setQuestions}/>} />
            <Route path="/showQuestions" element={<ShowQuestions questions={questions} setQuestions={setQuestions} subjects={subjects}/>} />
          </Routes>
         
        </div>
      </div>
    </Router>
  );
}

export default App;