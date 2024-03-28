import {useEffect} from "react";

const ShowSubjects = ({data,fetchData}) => {


  useEffect(() => {
    fetchData();
    console.log("Fetching data",data);
    
  }, []);


  return (
    <section className="px-16 py-6 all subjects">
      <h1 className="mb-10 text-3xl font-semibold">All Subjects</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map(({subject_name,id}) => (
          <div key={id} className="card bg-slate-50 drop-shadow">
            {/* <figure>
            <img src={`/path/to/logos/${subject}.svg`} alt={subject} />
        </figure> */}
            <div className="card-body">
              <h2 className="mx-auto text-3xl text-gray-600 card-title w-fit">
                {subject_name}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShowSubjects;
