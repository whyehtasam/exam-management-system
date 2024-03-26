// This React component, ShowQuestions, is responsible for displaying a table of questions, filtered by subject and difficulty level. 
// It includes functionalities to edit, delete, and update questions. 
// It utilizes local storage to persist question data between sessions.

import { useState, useEffect } from "react";

const ShowQuestions = ({ subjects, questions: initialQuestions }) => {
  // State variables for managing questions, selected subject and difficulty, and current question being edited
  const [questions, setQuestions] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("All Questions");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Choose difficulty");
  const [currentQuestion, setCurrentQuestion] = useState(null);

  // Effect to load questions from local storage or initial questions when component mounts
  useEffect(() => {
    const storedQuestions = localStorage.getItem("questions");
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    } else {
      setQuestions(initialQuestions);
    }
  }, [initialQuestions]);

  // Filtering questions based on selected subject and difficulty
  const filteredQuestions = questions.filter((question) => {
    const subjectMatches =
      selectedSubject === "All Questions" || question.subject === selectedSubject;
    const difficultyMatches =
      selectedDifficulty === "Choose difficulty" || question.difficulty === selectedDifficulty;
    return subjectMatches && difficultyMatches;
  });

  // Function to edit a question
  const editQuestion = (index) => {
    setCurrentQuestion({ ...questions[index], index });
  };

  // Function to delete a question
  const deleteQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
    localStorage.setItem("questions", JSON.stringify(newQuestions));
  };

  // Function to update a question
  const updateQuestion = (updatedQuestion) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestion.index] = updatedQuestion;
    setQuestions(newQuestions);
    setCurrentQuestion(null);
    localStorage.setItem("questions", JSON.stringify(newQuestions));
  };

  // Function to handle form submission when editing a question
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedQuestion = {
      subject: e.target.subject.value,
      difficulty: e.target.difficulty.value,
      question: e.target.question.value,
      correctAnswer: e.target.correctAnswer.value,
      options: Array.from(e.target.elements)
        .filter((element) => element.name.startsWith("option"))
        .map((element) => element.value),
    };
    updateQuestion(updatedQuestion);
    e.target.reset();
    document.getElementById("my_modal_1").close();
  };


  return (
    <section className="px-16 py-6">
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
            <tr key={index}>
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
              <td className="flex gap-6 ">
                <button
                  className="btn btn-sm"
                  onClick={() => {
                    editQuestion(index);
                    document.getElementById("my_modal_1").showModal();
                  }}
                >
                  Edit
                </button>
                <dialog id="my_modal_1" className="modal">
                  <div className="modal-box">
                    <h3 className="text-lg font-bold">
                      Edit the Question below
                    </h3>

                    <div className="modal-action">
                      <form
                        onSubmit={handleFormSubmit}
                        className="grid w-full grid-cols-2 gap-6 mb-4"
                        method="dialog"
                      >
                        <div className="mb-4">
                          <label
                            htmlFor="subject"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Subject
                          </label>
                          <select
                            id="subject"
                            name="subject"
                            value={currentQuestion?.subject || ""}
                            onChange={(e) =>
                              setCurrentQuestion({
                                ...currentQuestion,
                                subject: e.target.value,
                              })
                            }
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                          >
                            <option value="Choose subject" disabled>
                              Choose subject
                            </option>
                            {subjects.map((subject, index) => (
                              <option key={index} value={subject}>
                                {subject}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="difficulty"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Difficulty
                          </label>
                          <select
                            id="difficulty"
                            name="difficulty"
                            value={currentQuestion?.difficulty || ""}
                            onChange={(e) =>
                              setCurrentQuestion({
                                ...currentQuestion,
                                difficulty: e.target.value,
                              })
                            }
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                          >
                            <option value="Choose difficulty" disabled>
                              Choose difficulty
                            </option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                          </select>
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="question"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Question
                          </label>
                          <input
                            type="text"
                            id="question"
                            name="question"
                            value={currentQuestion?.question || ""}
                            onChange={(e) =>
                              setCurrentQuestion({
                                ...currentQuestion,
                                question: e.target.value,
                              })
                            }
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="correctAnswer"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Correct Answer
                          </label>
                          <input
                            type="text"
                            id="correctAnswer"
                            name="correctAnswer"
                            value={currentQuestion?.correctAnswer || ""}
                            onChange={(e) =>
                              setCurrentQuestion({
                                ...currentQuestion,
                                correctAnswer: e.target.value,
                              })
                            }
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                          />
                        </div>
                        {currentQuestion?.options.map((option, index) => (
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
                                const newOptions = [...currentQuestion.options];
                                newOptions[index] = e.target.value;
                                setCurrentQuestion({
                                  ...currentQuestion,
                                  options: newOptions,
                                });
                              }}
                              className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                            />
                          </div>
                        ))}
                        <button
                          type="submit"
                          className="btn btn-success "
                        >
                          Save
                        </button>
                        <button className="btn btn-neutral ">
                          Close
                        </button>
                      </form>
                    </div>
                  </div>
                </dialog>
                <button
                  onClick={() => deleteQuestion(index)}
                  className="btn btn-error btn-sm"
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
