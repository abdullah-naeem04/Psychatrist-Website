import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import doctorInfo from "../../config/doctorInfo";
import ReviewCard from "../utils/ReveiwsCard";
import { MoveLeft, MoveRight, Quote } from "lucide-react";

const getReviews = () => [
  {
    rating: 5,
    text: `${doctorInfo.name} has been incredible in helping me manage my depression and anxiety. His compassionate approach and evidence-based treatment have truly transformed my life. I can't thank him enough for his patience and expertise.`,
    name: "Ryan Almeida",
    disease: "Depression & Anxiety",
    time: "3 weeks ago",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    rating: 4,
    text: `I was struggling with bipolar disorder for years before I found ${doctorInfo.name}. His comprehensive treatment plan and regular follow-ups have helped me achieve stability. He's not just a doctor, he genuinely cares about his patients`,
    name: "Blossom Menezes",
    disease: "Bipolar Disorder",
    time: "March 2026",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    rating: 5,
    text: `${doctorInfo.name} helped my son overcome severe behavioral issues and ADHD. His approach with children is exceptional gentle, understanding, and effective. Our whole family is grateful for the positive changes we've seen.`,
    name: "Jason Roy",
    disease: "Child Psychiatry (Son, 12 years)",
    time: "Feb 2026",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
  },
  {
    rating: 5,
    text: `After struggling with substance abuse for 8 years, ${doctorInfo.name}'s addiction recovery program helped me reclaim my life. His structured approach, combined with compassionate care, made all the difference. I've been sober for 18 months now.`,
    name: "Jason Roy",
    disease: "Addiction Recovery",
    time: "Dec 2025",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
  },
  {
    rating: 5,
    text: `${doctorInfo.name}'s expertise in treating OCD and panic disorders is remarkable. The cognitive behavioral therapy sessions, along with proper medication management, have significantly reduced my symptoms. Highly recommended!`,
    name: "Jason Roy",
    disease: "OCD & Panic Disorder",
    time: "Nov 2025",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
  },
  {
    rating: 5,
    text: `As a corporate executive, I was dealing with severe work stress and burnout. ${doctorInfo.name}'s psychotherapy sessions helped me develop healthy coping mechanisms and achieve work-life balance. His professional yet warm demeanor is very reassuring`,
    name: "Jason Roy",
    disease: "Work Stress & Burnout",
    time: "Aug 2025",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
  },
];

const Reviews = () => {
  const reviews = getReviews();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const totalSlides = reviews.length;

  // Indicator width = 1 segment out of totalSlides (as a % of track)
  const indicatorWidthPercent = 100 / totalSlides;

  // Left position: moves one segment per slide
  const progressPercent = currentIndex * indicatorWidthPercent;

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section id="reviews" className="my-20 py-5 px-5 bg-white overflow-hidden">
      {/* Heading */}
      <div className="max-w-6xl mx-auto text-center mb-10  ">
        <span className="inline-block text-xs font-semibold tracking-widest text-blue-600 uppercase mb-3 px-4 py-1.5 bg-blue-50 rounded-full border border-blue-100">
          Voices of Our Patients
        </span>

        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
          Patients Reviews & Testimonials
        </h2>

        <p className="text-gray-600 text-lg max-w-xl mx-auto leading-relaxed">
          Real experiences from patients who have received care from{" "}
          {doctorInfo.name}
        </p>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-[30%_70%] gap-10 items-center overflow-hidden">
        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center items-center md:items-start">
          <div className="text-6xl text-blue-500 mb-6 ml-4">
            <Quote strokeWidth={3} />
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold text-slate-800 leading-snug text-center">
            What our Patients are saying
          </h2>

          <div className="flex items-center gap-5 mt-10 justify-center w-full">
            <button
              onClick={scrollPrev}
              className="text-xl cursor-pointer text-blue-500 hover:text-blue-600 transition-all duration-300"
            >
              <MoveLeft strokeWidth={3} />
            </button>

            {/* Progress Bar — fully dynamic */}
            <div className="relative w-48 h-[3px] bg-gray-300 rounded-full overflow-hidden">
              <div
                className="absolute top-0 h-full bg-blue-500 rounded-full transition-all duration-500 ease-in-out"
                style={{
                  width: `${indicatorWidthPercent}%`,
                  left: `${progressPercent}%`,
                }}
              />
            </div>

            <button
              onClick={scrollNext}
              className="text-xl cursor-pointer text-blue-500 hover:text-blue-600 transition-all duration-300"
            >
              <MoveRight strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="overflow-hidden px-1" ref={emblaRef}>
          <div className="flex -ml-3 cursor-grab active:cursor-grabbing select-none">
            {reviews.map((item, index) => (
              <div
                key={index}
                className="
                  pl-3
                  flex-[0_0_100%]
                  sm:flex-[0_0_38%]
                  lg:flex-[0_0_38%]
                  min-w-0
                  flex
                "
              >
                <ReviewCard data={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
