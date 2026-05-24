import { Clock4, Mail, Phone } from "lucide-react";
import doctorInfo from "../../config/doctorInfo";

const ContactSidebar = ({ notes }) => {
  return (
    <div className="h-full flex flex-col gap-10">
      <div className="rounded-2xl bg-linear-to-tr border border-slate-100 from-white via-slate-50 to-blue-50 p-6 md:p-10 shadow-sm">
        <div className="flex flex-col items-center">
          <span className="inline-flex w-fit text-xs font-semibold tracking-widest text-blue-700 uppercase mb-4 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100">
            Contact Information
          </span>
          <h3 className="text-2xl font-bold text-slate-800 leading-tight my-4 capitalize text-center">
            Feel free to contact us anytime
          </h3>
          <p className="text-slate-600 leading-relaxed mb-8 text-center">
            We are here to support your mental health journey with privacy,
            empathy, and professional care.
          </p>

          <div className="space-y-5 w-full mt-5">
            <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 flex items-center gap-3 shadow-md hover:scale-101 transition-transform duration-300">
              <div className="absolute inset-0 bg-linear-to-r from-gray-50 via-gray-100 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 rounded-lg bg-blue-50 p-3 text-blue-600">
                <Mail className="mt-0.5" />
              </div>
              <div className="relative z-10">
                <p className="text-sm text-slate-500">Email</p>

                <p className="font-semibold text-slate-800">
                  {doctorInfo.email}
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 flex items-center gap-3 shadow-md hover:scale-102 transition-transform duration-300">
              <div className="absolute inset-0 bg-linear-to-r from-gray-50 via-gray-100 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 rounded-lg bg-blue-50 p-3 text-blue-600">
                <Phone className="mt-0.5" />
              </div>
              <div className="relative z-10">
                <p className="text-sm text-slate-500">Phone</p>
                <p className="font-semibold text-slate-800">{doctorInfo.phone}</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 flex items-center gap-3 shadow-md hover:scale-101 transition-transform duration-300">
              <div className="absolute inset-0 bg-linear-to-r from-gray-50 via-gray-100 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10 rounded-lg bg-blue-50 p-3 text-blue-600">
                <Clock4 className="mt-0.5" />
              </div>
              <div className="relative z-10">
                <p className="text-sm text-slate-500">Working Hours</p>

                <p className="font-semibold text-slate-800">
                  Monday - Saturday, 10:00 AM - 9:00 PM
                </p>

                <p className="text-sm text-slate-500">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-330 rounded-2xl border border-amber-200 bg-amber-50/60 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-amber-500 mb-4">
          Important Notes
        </h3>

        <ul className="space-y-3">
          {notes.map((note, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-gray-700 text-sm leading-relaxed"
            >
              <span className="mt-1 h-2 w-2 rounded-full bg-amber-500 shrink-0" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContactSidebar;
