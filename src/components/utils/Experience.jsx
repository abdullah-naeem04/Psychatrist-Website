import React from "react";

const Experience = () => {
  const experienceData = [
    {
      title: "Consultant Psychiatrist",
      place: "Private Practice, Lahore",
      year: "2015 - Present",
    },
    {
      title: "Senior Registrar",
      place: "Institute of Psychiatry, Services Hospital, Lahore",
      year: "2012 - 2015",
    },
    {
      title: "Medical Officer (Psychiatry)",
      place: "Jinnah Hospital, Lahore",
      year: "2009 - 2012",
    },
  ];

  return (
    <section className="bg-linear-to-r from-gray-50 via-gray-100 to-blue-50 my-20 py-10 rounded-2xl">
      <div className="max-w-5xl mx-auto px-5">
        
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold text-gray-800">
            Professional Experience & Memberships
          </h2>
        </div>

        <div className="relative md:border-l-2 md:border-blue-200 md:pl-8 mb-5 space-y-10">

          {experienceData.map((item, index) => (
            <div
            key={index}
            className="relative group transition-all duration-300 hover:-translate-y-1"
          >
            
            <div className="absolute left-[-10px] top-2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow z-10"></div>
          
            <div className="relative bg-white rounded-xl shadow-sm p-5 overflow-hidden group-hover:shadow-md transition-all duration-300">
              
              <div className="absolute inset-0 bg-linear-to-r from-gray-50 via-gray-100 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>
          
                <p className="text-sm text-gray-600 mt-1">
                  {item.place}
                </p>
          
                <span className="inline-block mt-2 text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {item.year}
                </span>
              </div>
          
            </div>
          </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Experience;