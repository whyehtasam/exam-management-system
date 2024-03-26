import { useState } from "react";

const PrepareSet = ({ subjects, questions }) => {
  const [selectedSubject, setSelectedSubject] = useState("All Questions");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Choose difficulty");

  const filteredQuestions = questions.filter((question) => {
    const subjectMatches =
      selectedSubject === "All Questions" ||
      question.subject === selectedSubject;
    const difficultyMatches =
      selectedDifficulty === "Choose difficulty" ||
      question.difficulty === selectedDifficulty;
    return subjectMatches && difficultyMatches;
  });

  return (
    <div className="px-16 py-6">
      <div className="flex gap-6">
        <div className="mb-4 w-72">
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700"
          >
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
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 w-72">
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700"
          >
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
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>S No.</th>
            <th>Subject</th>
            <th>Question</th>
            <th>Difficulty</th>
            <th>Options</th>
            <th>Correct Answer</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.map((question, index) => (
            <tr key={index}>
              <td><input type="checkbox"  className="checkbox" /></td>
              <td>{index + 1}</td>
              <td>{question.subject}</td>
              <td>{question.question}</td>
              <td>{question.difficulty}</td>
              <td>
                <ul className="list-decimal">
                  {question.options.map((opt) => (
                    <li key={opt}>{opt}</li>
                  ))}
                </ul>
              </td>
              <td>{question.correctAnswer}</td>
            </tr>
          ))}
        </tbody>
      </table>{" "}
    </div>
  );
};

export default PrepareSet;
