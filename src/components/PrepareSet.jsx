
const PrepareSet = ({totalQuestions}) => {
    console.log('total: ',totalQuestions)
  return (
    <div>   <table className="table w-full">
    <thead>
      <tr>
        <th>S No.</th>
        <th>Subject</th>
        <th>Question</th>
        <th>Difficulty</th>
        <th>Options</th>
        <th>Correct Answer</th>
        
      </tr>
    </thead>
    <tbody>
      {totalQuestions.map((question, index) => (
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
          
        </tr>
      ))}
    </tbody>
  </table>   </div>
  )
}

export default PrepareSet