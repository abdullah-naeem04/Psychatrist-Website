import React from "react";
import Education from "../utils/Education";
import Experience from "../utils/Experience";

const About = () => {
  return (
    <section id="about" className="mt-10 p-5">
      <div className="max-w-330 mx-auto">
        <div className="max-w-3xl mx-auto ">
          <div className="text-center">
          <span className="inline-block text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3 px-4 py-1.5 bg-blue-50 rounded-full border border-blue-100">
            My Work and Vision
          </span>
          </div>
          <h2 className="md:text-5xl text-4xl font-bold text-gray-800 text-center">
            About Doctor Farwa Naeem
          </h2>
          <p className="text-lg text-gray-600 text-center mt-5">
            A dedicated psychiatrist committed to providing compassionate,
            evidence-based mental health care to patients across all age groups.
          </p>
        </div>
        <div className="mt-10 sm:mt-20 w-full flex flex-col md:flex-row">
          <div className=" flex justify-center md:justify-start">
            <img
              src="/images/Doctor-Image-About.jpg"
              alt="Doctor Image About Section"
              className="w-5/6 h-auto max-h-120 rounded-2xl object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 py-10 md:py-0">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Professional Profile
            </h3>
            <p className="text-md text-gray-600 py-2">
              Dr. Farwa Naeem is a highly experienced consultant psychiatrist
              practicing in Lahore, Pakistan, with over 15 years of dedicated
              service in the field of mental health. He specializes in treating
              a wide range of psychiatric conditions including depression,
              anxiety disorders, bipolar disorder, schizophrenia, and substance
              use disorders.
            </p>
            <p className="text-md text-gray-600 py-2">
              With a patient-centered approach, Dr. Zafar combines the latest
              evidence-based treatments with compassionate care to help patients
              achieve mental wellness and improve their quality of life. He is
              particularly skilled in managing complex cases and providing
              comprehensive care for both adults and children.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          <div className="bg-blue-100 p-4 w-full rounded-xl">
            <p className="text-2xl font-bold text-blue-600">7+</p>
            <p className="text-xs sm:text-sm font-normal text-gray-600">
              Years of experience
            </p>
          </div>
          <div className="bg-green-100 p-4 w-full rounded-xl">
            <p className="text-2xl font-bold text-green-600">500+</p>
            <p className="text-xs sm:text-sm font-normal text-gray-600">
              Patients Treated
            </p>
          </div>
          <div className="bg-purple-100 p-4 w-full rounded-xl">
            <p className="text-2xl font-bold text-purple-600">98%</p>
            <p className="text-xs sm:text-sm font-normal text-gray-600">
              Patient Satisfaction
            </p>
          </div>
          <div className="bg-amber-100 p-4 w-full rounded-xl">
            <p className="text-2xl font-bold text-amber-600">4.9/5</p>
            <p className="text-xs sm:text-sm font-normal text-gray-600">
              Average Rating
            </p>
          </div>
        </div>
        <Education />
        <Experience />
      </div>
    </section>
  );
};

export default About;
