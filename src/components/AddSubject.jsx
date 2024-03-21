import React, { useState, useEffect } from "react";

function AddSubject({ subjects, setSubjects }) {
  const [subject, setSubject] = useState("");


  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (subject !== "") {
      setSubjects([...subjects, subject]);
      setSubject("");
    }
  };

  const handleDelete = (index) => {
    const newSubjects = [...subjects];
    newSubjects.splice(index, 1);
    setSubjects(newSubjects);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">Add Subjects</h1>
      <form onSubmit={handleSubmit} className="mb-4 grid grid-cols-4 items-end gap-6">
        <div className=" ">
          <div>

          <label
            htmlFor="subject"
            className="block text-base font-medium text-gray-700"
            >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
            </div>
        </div>
        
        <button type="submit" className="btn w-fit btn-primary">
          Add Subject
        </button>
      </form>
      <table className="table max-w-3xl  mt-10">
        <thead>
          <tr>
            <th>S No.</th>
            <th>Subject</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, index) => (
            <tr key={index} className="hover:bg-slate-50">
              <td>{index + 1}</td>
              <td>{subject}</td>
              <td className="text-right">
                <button
                  onClick={() => handleDelete(index)}
                  className="btn btn-error btn-sm text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AddSubject;
