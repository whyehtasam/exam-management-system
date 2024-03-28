import React, { useState, useEffect } from "react";
import AddSubject from "./components/AddSubject";
import ShowSubjects from "./components/ShowSubjects";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddQuestions from "./components/AddQuestions";
import ShowQuestions from "./components/ShowQuestions";
import PrepareSet from "./components/PrepareSet";

function App() {
  const [fetchSubjects, setFetchSubjects] = useState([]);
  const [fetchQues, setFetchQues] = useState([]);

  const [totalQuestions, setTotalQuestions] = useState([]);
  const [subjects, setSubjects] = useState(
    JSON.parse(localStorage.getItem("subjects")) || []
  );

  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);
  const [questions, setQuestions] = useState(
    JSON.parse(localStorage.getItem("questions")) || []
  );

  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions));
  }, [questions]);

  function getData(data) {
    setTotalQuestions(data);
  }
  console.log("fetch:", fetchSubjects);

  // Fetching subject data from the server
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://api.ahthitsolutions.com/v1/get_all_subjects",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setFetchSubjects(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // fetching question data from the server
  const fetchQuesData = async () => {
    try {
      const response = await fetch(
        "http://api.ahthitsolutions.com/v1/get_all_qa_outset",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setFetchQues([ ...data]);
      console.log('all ques inside fun:', data);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchQuesData();
   }
  , []);
  useEffect(() => {
    console.log('all ques after fetch:', fetchQues);
  }, [fetchQues]);

  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <Routes>
            <Route
              path="/"
              element={
                <AddSubject
                  subjects={subjects}
                  setSubjects={setSubjects}
                  fetchData={fetchData}
                  data={fetchSubjects}
                />
              }
            />
            <Route
              path="/showSubjects"
              element={
                <ShowSubjects fetchData={fetchData} data={fetchSubjects} />
              }
            />
            <Route
              path="/addQuestions"
              element={
                <AddQuestions
                  subjects={fetchSubjects}
                  questions={questions}
                  setQuestions={setQuestions}
                  fetchData={fetchData}
                />
              }
            />

            <Route
              path="/showQuestions"
              element={
                <ShowQuestions
                  questions={questions}
                  setQuestions={setQuestions}
                  // subjects={subjects}
                  getData={getData}
                  fetchQues={fetchQues}
                  subjects={fetchSubjects}
                />
              }
            />

            <Route
              path="/prepareSets"
              element={
                <PrepareSet questions={totalQuestions} subjects={subjects} />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
