import { CircleCheck, Dot, Star } from "lucide-react";
import React from "react";

const Home = () => {
  return (
    <section id="home">
      <div className="my-21 min-h-[calc(100vh-84px)] max-w-330 mx-auto flex items-center flex-col md:flex-row px-5 ">
        <div className="w-full md:w-1/2 my-6 md:my-4">
          <div className="inline-flex bg-blue-50 text-blue-600 rounded-full sm:px-4 px-3 py-2 text-sm items-center">
            <CircleCheck width={18} />
            <span className="pl-2">Verified Doctor</span>
            <Dot strokeWidth={3} />
            <span>PMDC Registered</span>
          </div>
          <div className="flex flex-col gap-5 my-4">
            <h1 className="text-5xl font-bold text-gray-800 py-4">
              Dr. Farwa Naeem
            </h1>
            <span className="text-lg font-medium text-gray-500">
              Consultant psychiatrist
            </span>
            <p className="text-lg text-gray-700 ">
              Expert psychiatric care for adults, children, and adolescents.
              Specialized in mental health disorders, addiction recovery, and
              comprehensive psychotherapy services in allover the world.
            </p>
          </div>
          <div className="w-full flex py-4">
            <div className="w-1/2">
              <div className="flex gap-2">
                <div className="bg-blue-100 text-blue-600 inline-flex sm:p-4 p-3 rounded-xl">
                  <CircleCheck />
                </div>
                <div className="">
                  <h3 className="font-semibold sm:text-lg text-md text-gray-800">
                    7+ years
                  </h3>
                  <span className="sm:text-md text-xs text-gray-600">
                    Experience
                  </span>
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <div className="flex gap-2">
                <div className="bg-blue-100 text-blue-600 inline-flex sm:p-4 p-3 rounded-xl">
                  <Star />
                </div>
                <div className="">
                  <h3 className="font-semibold sm:text-lg text-md text-gray-800">
                    4.9/5
                  </h3>
                  <span className="sm:text-md text-xs text-gray-600">
                    Patient Rating
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="my-4 w-full">
            <button
              type="button"
              className="fill-btn flex items-center justify-center gap-2 border-2 border-blue-500 px-3 py-2 rounded-xl cursor-pointer w-full"
            >
              Book Vedio Consultation
            </button>
          </div>
          <div className="flex gap-5 pt-2">
            <div className="flex gap-1 text-xs items-center">
              <CircleCheck width={18} className="text-green-600" />
              <span className="text-gray-600">Same Day Appointment</span>
            </div>
            <div className="flex gap-1 text-xs items-center">
              <CircleCheck width={18} className="text-green-600" />
              <span className="text-gray-600">Confidential Care</span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 my-5">
          <div className="flex justify-center  w-full relative">
            <img
              src="/images/doctor-img1.png"
              alt="Doctor Farwa Naeem Psychologist image"
              className="sm:w-5/6 w-full h-auto max-h-[550px] object-cover rounded-2xl"
            />

            <div className="hidden md:flex absolute -bottom-4 left-8 bg-white shadow-lg rounded-xl p-4 divide-x divide-gray-300">
              <div className="pr-4 text-center">
                <h3 className="font-bold text-lg text-blue-600">500+</h3>
                <span className="text-sm text-gray-500">Patients Treated</span>
              </div>

              <div className="pl-4 text-center">
                <h3 className="font-bold text-lg text-green-600">98%</h3>
                <span className="text-sm text-gray-500">Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
