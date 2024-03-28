import React, { useState,useEffect } from "react";

const PrepareSet = ({ subjects, fetchQues,fetchQuesData }) => {
  const [selectedSubject, setSelectedSubject] = useState("All Questions");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Choose difficulty");
  const [selectedSet, setSelectedSet] = useState("Choose Set");
  const [checkedQues, setCheckedQues] = useState([]);
  const [tempCheckedQues, setTempCheckedQues] = useState([]);

  const handleCheck = (index, isChecked) => {
    const question = filteredQuestions[index];
    const formattedQuestion = {
      subject_name: question.subject_name,
      set: selectedSet,
      question_level: question.question_level,
      question: question.question,
      options: question.options,
      correct_answer: question.correct_answer,
    };
    if (isChecked) {
      setTempCheckedQues([...tempCheckedQues, formattedQuestion]);
    } else {
      setTempCheckedQues(tempCheckedQues.filter((q) => q.question !== question.question));
    }
  };

  const handlePrepareSet = () => {
    setCheckedQues(tempCheckedQues);
    
  };
  useEffect(() => {
    console.log('checked:', checkedQues);
  }, [checkedQues]);

  const filteredQuestions = fetchQues.filter((question) => {
    const subjectMatches =
      selectedSubject === "All Questions" ||
      question.subject_name === selectedSubject;
    const difficultyMatches =
      selectedDifficulty === "Choose difficulty" ||
      question.question_level === selectedDifficulty;
    return subjectMatches && difficultyMatches;
  });
useEffect(() => {
  fetchQuesData();
}, []);
  return (
    <div className="px-16 py-6">
      <div className="flex gap-6">
        <div className="mb-4 w-72">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
            Select Subject
          </label>
          <select
            id="subject"
            name="subject"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
          >
            <option value="All Questions">All Questions</option>
            {subjects.map(({ subject_name }, index) => (
              <option key={index} value={subject_name}>
                {subject_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4 w-72">
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
            Select Difficulty
          </label>
          <select
            id="difficulty"
            name="difficulty"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
          >
            <option value="Choose difficulty">All Difficulty</option>
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
        </div>
        <div className="mb-4 w-72">
          <label htmlFor="set" className="block text-sm font-medium text-gray-700">
            Select Set
          </label>
          <select
            id="set"
            name="set"
            value={selectedSet}
            onChange={(e) => setSelectedSet(e.target.value)}
            className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
          >
            <option value="Choose Set" disabled>Choose Set</option>
            {Array.from({ length: 20 }, (_, i) => (
              <option key={i} value={`set${i + 1}`}>
                Set {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Subject</th>
            <th>Question</th>
            <th>Difficulty</th>
            <th>Options</th>
            <th>Correct Answer</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.map((question, index) => (
            <tr key={question.id}>
              <td><input type="checkbox" className="checkbox" onChange={(e) => handleCheck(index, e.target.checked)} /></td>
              <td>{question.subject_name}</td>
              <td>{question.question}</td>
              <td>{question.question_level}</td>
              <td>
                <ul className="list-decimal">
                  {question.options.map((opt, i) => (
                    <li key={i}>{opt}</li>
                  ))}
                </ul>
              </td>
              <td>{question.correct_answer}</td>
            </tr>
          ))}
        </tbody>
      </table>{" "}
      <button className="btn" onClick={handlePrepareSet}>Prepare Set</button>
    </div>
  );
};

export default PrepareSet;