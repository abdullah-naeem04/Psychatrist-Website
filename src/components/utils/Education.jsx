import React from "react";
import {GraduationCap} from 'lucide-react'

const Education = () => {
  const educationData = [
    {
      title: "MBBS",
      desc: "Bachelor of Medicine and Surgery",
      sub: "University of Health Sciences, Lahore",
      icon: <GraduationCap />,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      title: "FCPS (Psychiatry)",
      desc: "Fellow of College of Physicians and Surgeons",
      sub: "College of Physicians & Surgeons Pakistan",
      icon: <GraduationCap />,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      title: "MD (Psychiatry)",
      desc: "Doctor of Medicine in Psychiatry",
      sub: "King Edward Medical University",
      icon: <GraduationCap />,
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
    {
      title: "PMDC Registered",
      desc: "Pakistan Medical & Dental Council",
      sub: "License No. 12345-P",
      icon: <GraduationCap />,
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
    {
      title: "Member PPA",
      desc: "Pakistan Psychiatric Association",
      sub: "Active Member since 2009",
      icon: <GraduationCap />,
      bg: "bg-red-100",
      text: "text-red-500",
    },
    {
      title: "Specializations",
      desc: "Adult & Child Psychiatry",
      sub: "Addiction & Psychotherapy",
      icon: <GraduationCap />,
      bg: "bg-teal-100",
      text: "text-teal-600",
    },
  ];

  return (
    <div className="mt-20 bg-linear-to-r from-gray-50 via-gray-100 to-blue-50 rounded-lg min-h-120 ">
        <h2 className="py-10 font-semibold text-2xl text-center text-gray-800">Qualification and Education</h2>
      <div className="max-w-6xl mx-auto px-5 pb-10">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {educationData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg hover:scale-101 transition duration-300"
            >
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${item.bg} ${item.text}`}
              >
                {item.icon}
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600">{item.desc}</p>
              <p className="text-xs text-gray-500 mt-1">{item.sub}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Education;