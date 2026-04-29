import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import {ChevronLeft, ChevronRight} from "lucide-react"

const services = [
  {
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=600&q=80",
    title: "General Adult Psychiatry",
    description:
      "Comprehensive evaluation and treatment of mental health disorders including depression, anxiety, bipolar disorder, and PTSD.",
    points: [
      "Depression & Anxiety Treatment",
      "Mood Disorders Management",
      "Stress & Trauma Therapy",
      "Psychotic Disorders Care",
    ],
  },
  {
    image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600&q=80",
    title: "Child & Adolescent Care",
    description:
      "Specialized mental health support for children and teens navigating developmental, behavioral, and emotional challenges.",
    points: [
      "ADHD Evaluation & Management",
      "Behavioral Therapy",
      "School & Social Anxiety",
      "Family Counseling",
    ],
  },
  {
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80",
    title: "Individual Psychotherapy",
    description:
      "One-on-one therapy sessions using evidence-based methods to help you understand and manage thoughts, feelings, and behaviors.",
    points: [
      "Cognitive Behavioral Therapy",
      "Mindfulness-Based Therapy",
      "Grief & Loss Support",
      "Self-Esteem Building",
    ],
  },
  {
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
    title: "Couples & Family Therapy",
    description:
      "Restore healthy communication and rebuild trust within relationships and family systems through structured therapeutic sessions.",
    points: [
      "Conflict Resolution",
      "Communication Skills",
      "Parenting Support",
      "Relationship Rebuilding",
    ],
  },
  {
    image: "https://images.unsplash.com/photo-1520206183501-b80df61043c2?w=600&q=80",
    title: "Addiction & Recovery",
    description:
      "Compassionate, non-judgmental support for individuals overcoming substance use disorders and building lasting recovery.",
    points: [
      "Substance Use Assessment",
      "Relapse Prevention",
      "Dual Diagnosis Treatment",
      "Recovery Coaching",
    ],
  },
];

const stats = [
  { value: "7+", label: "Years Experience", color: "text-blue-600" },
  { value: "500+", label: "Patients Helped", color: "text-green-600" },
  { value: "98%", label: "Success Rate", color: "text-purple-600" },
  { value: "24/7", label: "Emergency Support", color: "text-orange-500" },
];


const Services = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section id="services" className="my-20 p-5 bg-white overflow-hidden">
      <div className="max-w-325 mx-auto">

        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3 px-4 py-1.5 bg-blue-50 rounded-full border border-blue-100">
            What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            Our Services
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto leading-relaxed">
            Professional mental health services tailored to every stage of your journey.
          </p>
        </div>

        <div className="relative">

          <button
            onClick={scrollPrev}
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 text-xl hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-blue-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={scrollNext}
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 text-xl hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-blue-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <ChevronRight />
          </button>

          <div className="overflow-hidden py-4 px-[2px]" ref={emblaRef}>

            <div className="flex cursor-grab active:cursor-grabbing select-none">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 group px-2.5"
                >
                  <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col">

                    <div className="relative overflow-hidden aspect-4/3">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>

                    <div className="px-6 py-6 flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-slate-800 mb-2 leading-snug">
                        {service.title}
                      </h3>

                      <p className="text-slate-500 text-sm leading-relaxed mb-5">
                        {service.description}
                      </p>

                      <div className="mt-auto bg-blue-50/60 rounded-xl p-4 border border-blue-100/60">
                        <ul className="space-y-2">
                          {service.points.map((point, i) => (
                            <li key={i} className="flex items-center gap-2.5 text-sm text-slate-600">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      <div className="max-w-330 mx-auto bg-linear-to-r from-gray-50 via-gray-100 to-blue-50 rounded-2xl shadow-md px-6 py-12 mt-10">

        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-10">
          Why Choose Our Psychiatric Services?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              
              <span className={`text-3xl md:text-4xl font-bold ${item.color}`}>
                {item.value}
              </span>

              <span className="text-sm text-slate-600 mt-2">
                {item.label}
              </span>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;