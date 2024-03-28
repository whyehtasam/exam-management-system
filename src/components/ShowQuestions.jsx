import React, { useState, useEffect } from "react";

const ShowQuestions = ({ subjects, fetchQues, fetchQuesData }) => {
  const [questions, setQuestions] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("All Questions");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Choose difficulty");
  const [formData, setFormData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [originalData, setOriginalData] = useState(null);

  useEffect(() => {
    setQuestions(fetchQues);
  }, [fetchQues]);

  useEffect(() => {
    fetchQuesData();
  }, []);

  const filteredQuestions = questions.filter((question) => {
    const subjectMatches =
      selectedSubject === "All Questions" ||
      question.subject_name === selectedSubject;
    const difficultyMatches =
      selectedDifficulty === "Choose difficulty" ||
      question.question_level === selectedDifficulty;
    return subjectMatches && difficultyMatches;
  });

  const editQuestion = (id) => {
    const index = questions.findIndex((question) => question.id === id);
    if (index !== -1) {
      setCurrentQuestion({ ...questions[index], index });
      setFormData({ ...questions[index] });
      setOriginalData({ ...questions[index] });
      document.getElementById("my_modal_1").showModal();
    }
  };

  const updateQuestion = (updatedQuestion) => {
    const newQuestions = questions.map((question) =>
      question.id === updatedQuestion.id ? updatedQuestion : question
    );
    setQuestions(newQuestions);
    // Call any necessary callback function here
  };

  const deleteQuestion = async (id) => {
    try {
      const response = await fetch(`http://api.ahthitsolutions.com/v1/delete_qa_outset/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);
      }

      console.log('Question deleted successfully');
      const newQuestions = questions.filter((question) => question.id !== id);
      setQuestions(newQuestions);
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedQuestion = {
      id: formData.id,
      subject_name: e.target.subject.value,
      question_level: e.target.difficulty.value,
      question: e.target.question.value,
      correct_answer: e.target.correctAnswer.value,
      options: Array.from(e.target.elements)
        .filter((element) => element.name.startsWith("option"))
        .map((element) => element.value),
    };
    updateQuestion(updatedQuestion);
    e.target.reset();
    document.getElementById("my_modal_1").close();
    setFormData(null);
  };

  return (
    <section className="px-16 py-6">
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
            <th className="">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.map((question, index) => (
            <tr key={question.id}>
              <td>{index + 1}</td>
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
              <td className="flex gap-6">
                <button
                  className="btn btn-sm"
                  onClick={() => editQuestion(question.id)}
                >
                  Edit
                </button>
                <dialog id="my_modal_1" className="modal">
                  <div className="modal-box">
                    <h3 className="text-lg font-bold">Edit the Question below</h3>
                    <div className="modal-action">
                      <form
                        onSubmit={handleFormSubmit}
                        className="grid w-full grid-cols-2 gap-6 mb-4"
                      >
                        <div className="mb-4">
                          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                            Subject
                          </label>
                          <select
                            id="subject"
                            name="subject"
                            value={formData?.subject_name || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                subject_name: e.target.value,
                              })
                            }
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                          >
                            <option value="" disabled>
                              Choose subject
                            </option>
                            {subjects.map(({ subject_name }, index) => (
                              <option key={index} value={subject_name}>
                                {subject_name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
                            Difficulty
                          </label>
                          <select
                            id="difficulty"
                            name="difficulty"
                            value={formData?.question_level || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                question_level: e.target.value,
                              })
                            }
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                          >
                            <option value="" disabled>
                              Choose difficulty
                            </option>
                            <option value="EASY">Easy</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HARD">Hard</option>
                          </select>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="question" className="block text-sm font-medium text-gray-700">
                            Question
                          </label>
                          <input
                            type="text"
                            id="question"
                            name="question"
                            value={formData?.question || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                question: e.target.value,
                              })
                            }
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="correctAnswer" className="block text-sm font-medium text-gray-700">
                            Correct Answer
                          </label>
                          <input
                            type="text"
                            id="correctAnswer"
                            name="correctAnswer"
                            value={formData?.correct_answer || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                correct_answer: e.target.value,
                              })
                            }
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                          />
                        </div>
                        {formData?.options.map((option, index) => (
                          <div key={index} className="mb-4">
                            <label
                              htmlFor={`option${index}`}
                              className="block text-sm font-medium text-gray-700"
                            >
                              Option {index + 1}
                            </label>
                            <input
                              type="text"
                              id={`option${index}`}
                              name={`option${index}`}
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...formData.options];
                                newOptions[index] = e.target.value;
                                setFormData({
                                  ...formData,
                                  options: newOptions,
                                });
                              }}
                              className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                            />
                          </div>
                        ))}
                        <button type="submit" className="btn btn-success">
                          Save
                        </button>
                        <button
                          type="button"
                          className="btn btn-neutral"
                          onClick={() => {
                            document.getElementById("my_modal_1").close();
                            setFormData(originalData);
                          }}
                        >
                          Cancel
                        </button>
                      </form>
                    </div>
                  </div>
                </dialog>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => deleteQuestion(question.id)}
                >
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
