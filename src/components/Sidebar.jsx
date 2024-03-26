import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isActive, setIsActive] = useState(0);
  const links = [
    { path: "/", label: "Add Subjects" },
    { path: "/showSubjects", label: "Show Subjects" },
    { path: "/addQuestions", label: "Add Questions" },
    { path: "/showQuestions", label: "Show Questions" },
    { path: "/prepareSets", label: "Prepare Sets Ques" },
  ];
  return (
    <div className="drawer w-fit lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="flex flex-col items-center justify-center drawer-content">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="min-h-full p-5 space-y-3 menu w-80 bg-base-200 text-base-content">
          {/* Sidebar content here */}
          {links.map((link, index) => (
            <Link key={index} to={link.path}>
              <button
                className={`w-full btn btn-lg ${
                  isActive === index ? "btn-neutral" : "bg-base-100"
                }`}
                onClick={() => {
                  setIsActive(index);
                }}
              >
                {link.label}
              </button>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
