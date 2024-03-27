import React, { useState, useEffect } from 'react';

const AddQuestions = ({ subjects,questions,setQuestions }) => {
  const [selectedSubject, setSelectedSubject] = useState('Choose subject');
  const [question, setQuestion] = useState('');
  const [difficulty, setDifficulty] = useState('Choose difficulty');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question !== '' && options.every(option => option !== '') && correctAnswer !== '') {
      setQuestions([...questions, { subject: selectedSubject, question, difficulty, options, correctAnswer }]);
      setQuestion('');
      setOptions(['', '', '', '']);
      setCorrectAnswer('');
    }
  };

 

  console.log(questions);
  return (
    <section className="px-16 py-6">
            <h1 className="mb-10 text-3xl font-semibold ">Add Questions</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 mb-4">
  <div className="mb-4">
    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
      Subject
    </label>
    <select
      id="subject"
      name="subject"
      value={selectedSubject}
      onChange={(e) => setSelectedSubject(e.target.value)}
      className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
    >
      <option value="Choose subject"  disabled>Choose subject</option>
      {subjects.map((subject, index) => (
        <option key={index} value={subject}>
          {subject}
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
      value={difficulty}
      onChange={(e) => setDifficulty(e.target.value)}
      className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
    >
      <option value="Choose difficulty" disabled>Choose difficulty</option>
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
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
      value={question}
      onChange={(e) => setQuestion(e.target.value)}
      className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
      placeholder="Enter the question"
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
      value={correctAnswer}
      onChange={(e) => setCorrectAnswer(e.target.value)}
      className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
      placeholder="Enter the correct answer"
    />
  </div>
  {options.map((option, index) => (
    <div key={index} className="mb-4">
      <label htmlFor={`option${index}`} className="block text-sm font-medium text-gray-700">
        Option {index + 1}
      </label>
      <input
        type="text"
        id={`option${index}`}
        name={`option${index}`}
        value={option}
        onChange={(e) => {
          const newOptions = [...options];
          newOptions[index] = e.target.value;
          setOptions(newOptions);
        }}
        className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
        placeholder={`Enter option ${index + 1}`}
      />
    </div>
  ))}
  
  <button type="submit" className="btn btn-wide btn-primary">
    Add Question
  </button>
</form>
     
    </section>
  );
};

export default AddQuestions;