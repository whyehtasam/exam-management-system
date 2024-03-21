import React from "react";

const ShowSubjects = ({ subjects }) => {
  return (
    <section className="px-16 py-6 all subjects">
      <h1 className="mb-10 text-3xl font-semibold">All Subjects</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {subjects.map((subject, index) => (
          <div key={index} className="card bg-slate-50 drop-shadow">
            {/* <figure>
            <img src={`/path/to/logos/${subject}.svg`} alt={subject} />
        </figure> */}
            <div className="card-body">
              <h2 className="mx-auto text-3xl text-gray-600 card-title w-fit">
                {subject}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShowSubjects;
