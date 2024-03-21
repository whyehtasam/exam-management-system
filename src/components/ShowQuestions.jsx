import { useState } from "react";

const ShowQuestions = ({ subjects, questions }) => {
  const [selectedSubject, setSelectedSubject] = useState("All Questions");

  const filteredQuestions =
    selectedSubject === "All Questions"
      ? questions
      : questions.filter((question) => question.subject === selectedSubject);

  return (
    <section className="px-16 py-6">
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
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        >
          <option value="All Questions">All Questions</option>
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>S No.</th>
            <th>Subject</th>
            <th>Question</th>
            <th>Difficulty</th>
            <th>Options</th>
            <th>Correct Answer</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.map((question, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{question.subject}</td>
              <td>{question.question}</td>
              <td>{question.difficulty}</td>
              <td>{question.options.join(", ")}</td>
              <td>{question.correctAnswer}</td>
              <td className="text-right">
                <button onClick={''} className="btn btn-error btn-sm">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ShowQuestions;
