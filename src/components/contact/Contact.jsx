import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import doctorInfo from "../../config/doctorInfo";
import AppointmentForm from "./AppointmentForm";
import ContactSidebar from "./ContactSidebar";
import { appointmentSchema, notes } from "./utils";

const Contact = () => {
  const [submittedData, setSubmittedData] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const confirmationRef = useRef(null);

  const form = useForm({
    resolver: zodResolver(appointmentSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      preferredDate: "",
      preferredTime: "",
      concern: "",
    },
  });

  const onSubmit = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSubmittedData(values);
    setShowConfirmation(true);
    form.reset();
  };

  useEffect(() => {
    if (!showConfirmation) return;

    confirmationRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    const timer = setTimeout(() => {
      setShowConfirmation(false);
      setSubmittedData(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showConfirmation]);

  return (
    <section id="contact" className="my-20 p-5">
      <div className="max-w-330 mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3 px-4 py-1.5 bg-blue-50 rounded-full border border-blue-100">
            Book Your Slot
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            Book Your Appointment
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Schedule a consultation with {doctorInfo.name}.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-stretch">

            <div className="h-full min-w-0">
              <div className="h-full">
                <AppointmentForm
                  form={form}
                  onSubmit={onSubmit}
                  showConfirmation={showConfirmation}
                  submittedData={submittedData}
                  confirmationRef={confirmationRef}
                />
              </div>
            </div>

            <div className="h-full min-w-0">
              <div className="h-full">
                <ContactSidebar notes={notes} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;