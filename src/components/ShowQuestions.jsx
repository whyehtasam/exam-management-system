import React from 'react'

const ShowQuestions = ({questions,setQuestions}) => {
  return (
    <section className='px-16 py-6'>
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
          {questions.map((question, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{question.subject}</td>
              <td>{question.question}</td>
              <td>{question.difficulty}</td>
              <td>{question.options.join(', ')}</td>
              <td>{question.correctAnswer}</td>
              <td className="text-right">
                {/* <button onClick={() => handleDelete(index)} className="btn btn-error btn-sm">
                  Delete
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default ShowQuestions