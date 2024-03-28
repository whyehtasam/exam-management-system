import React, { useState, useEffect } from "react";

function AddSubject({ subjects, setSubjects,data,fetchData }) {
  const [subject, setSubject] = useState("");


  // // Fetching data from the server
  // const fetchData = async () => {
  //   try {
  //     const response = await fetch("http://api.ahthitsolutions.com/v1/get_all_subjects", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const data = await response.json();
  //     setData(data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (subject !== "") {
      const newSubject = [{ subject: subject }];

      try {
        const response = await fetch("http://api.ahthitsolutions.com/v1/store_subjects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSubject),
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);
        }
     

        setSubjects([...subjects, newSubject[0]]);
        setSubject("");
        fetchData();
      } catch (error) {
        console.error("Error posting data:", error);
      }
    }
  };

  // Handle deletion of a subject
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://api.ahthitsolutions.com/v1/delete_subject?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);
      }

      // Update local state after deletion
      const updatedSubjects = subjects.filter((subj) => subj.id !== id);
      setSubjects(updatedSubjects);
      fetchData(); // Fetch updated data
    } catch (error) {
      console.error("Error deleting subject:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="px-16 py-6">
      <h1 className="mb-10 text-3xl font-semibold">Add Subjects</h1>
      <form onSubmit={handleSubmit} className="grid items-end grid-cols-4 gap-6 mb-4">
        <div className="">
          <div>
            <label htmlFor="subject" className="block text-base font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <button type="submit" className="btn w-fit btn-primary">
          Add Subject
        </button>
      </form>
      <table className="table max-w-3xl mt-10">
        <thead>
          <tr>
            <th>S No.</th>
            <th>Subject</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((subj, index) => (
            <tr key={index} className="hover:bg-slate-50">
              <td>{index + 1}</td>
              <td>{subj.subject_name}</td>
              <td className="text-right">
                <button
                  onClick={() => handleDelete(subj.id)} // Pass subject ID to handleDelete
                  className="text-white btn btn-error btn-sm"
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
