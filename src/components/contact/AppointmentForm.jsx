import { useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import {
  amPmItems,
  formatDateISO,
  from24HourTime,
  getDaysInMonth,
  hourItems,
  isBeforeToday,
  minuteItems,
  to24HourTime,
  toDisplayDate,
  toDisplayTime,
} from "./utils";

const WheelColumn = ({ label, items, selectedValue, onChange, ariaLabel }) => {
  const containerRef = useRef(null);
  const [itemHeight, setItemHeight] = useState(44);
  const scrollTimeoutRef = useRef(null);
  const itemRefs = useRef([]);
  const isAutoScrollingRef = useRef(false);

  const selectedIndex = Math.max(
    0,
    items.findIndex((item) => item === selectedValue)
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const firstItem = el.querySelector("[data-wheel-item='true']");
    if (firstItem) setItemHeight(firstItem.getBoundingClientRect().height || 44);
  }, []);

  useEffect(() => {
    const selectedElement = itemRefs.current[selectedIndex];
    if (!selectedElement) return;
    isAutoScrollingRef.current = true;
    selectedElement.scrollIntoView({ block: "center", behavior: "smooth" });
    const releaseTimer = setTimeout(() => {
      isAutoScrollingRef.current = false;
    }, 220);
    return () => clearTimeout(releaseTimer);
  }, [selectedIndex, itemHeight]);

  const getClosestCenteredIndex = () => {
    const el = containerRef.current;
    if (!el) return selectedIndex;
    const containerRect = el.getBoundingClientRect();
    const centerY = containerRect.top + containerRect.height / 2;
    let closestIndex = selectedIndex;
    let minDistance = Number.POSITIVE_INFINITY;

    itemRefs.current.forEach((node, index) => {
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const nodeCenter = rect.top + rect.height / 2;
      const distance = Math.abs(nodeCenter - centerY);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  };

  const snapToClosest = () => {
    const nearestIndex = getClosestCenteredIndex();
    const nearestItem = items[nearestIndex];
    if (!nearestItem) return;
    onChange(nearestItem);
    itemRefs.current[nearestIndex]?.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (isAutoScrollingRef.current) return;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(snapToClosest, 100);
  };

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (!["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    if (event.key === "Home") onChange(items[0]);
    else if (event.key === "End") onChange(items[items.length - 1]);
    else if (event.key === "ArrowDown") {
      onChange(items[Math.min(items.length - 1, selectedIndex + 1)]);
    } else onChange(items[Math.max(0, selectedIndex - 1)]);
  };

  return (
    <div className="relative flex-1 min-w-0">
      <p className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase text-center mb-2">
        {label}
      </p>
      <div
        ref={containerRef}
        role="listbox"
        aria-label={ariaLabel}
        tabIndex={0}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        className="h-44 overflow-y-auto snap-y snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden rounded-2xl bg-white/70 backdrop-blur-sm px-2 py-[72px]"
      >
        {items.map((item, index) => (
          <button
            key={`${item}-${index}`}
            type="button"
            ref={(node) => {
              itemRefs.current[index] = node;
            }}
            role="option"
            aria-selected={selectedValue === item}
            onClick={() => onChange(item)}
            className={`w-full h-11 snap-center rounded-xl text-center text-base font-medium transition-all duration-200 ${
              selectedValue === item
                ? "bg-blue-100 text-blue-600"
                : "text-slate-500"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="pointer-events-none absolute left-0 right-0 top-6 h-12 rounded-t-2xl bg-linear-to-b from-slate-50 to-transparent" />
      <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-12 rounded-b-2xl bg-linear-to-t from-slate-50 to-transparent" />
    </div>
  );
};

const AppointmentForm = ({
  form,
  onSubmit,
  showConfirmation,
  submittedData,
  confirmationRef,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [wheelTime, setWheelTime] = useState({ hour: "10", minute: "00", period: "AM" });
  const datePickerRef = useRef(null);
  const timePickerRef = useRef(null);

  const {
    register,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = form;

  const preferredDateValue = watch("preferredDate");
  const preferredTimeValue = watch("preferredTime");
  const inputBaseStyle =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none transition duration-300 focus:border-blue-400 focus:ring-3 focus:ring-blue-50";
  const errorStyle = "mt-1 text-xs text-rose-500";

  const calendarYear = calendarMonth.getFullYear();
  const calendarMonthIndex = calendarMonth.getMonth();
  const firstDay = new Date(calendarYear, calendarMonthIndex, 1).getDay();
  const totalDays = getDaysInMonth(calendarYear, calendarMonthIndex);
  const today = new Date();
  const leadingDays = Array.from({ length: firstDay }, () => null);
  const monthDays = Array.from({ length: totalDays }, (_, index) => index + 1);
  const trailingCount = (7 - ((leadingDays.length + monthDays.length) % 7 || 7)) % 7;
  const trailingDays = Array.from({ length: trailingCount }, () => null);
  const calendarCells = [...leadingDays, ...monthDays, ...trailingDays];

  useEffect(() => {
    if (!showTimePicker) return;
    setWheelTime(from24HourTime(preferredTimeValue));
  }, [showTimePicker, preferredTimeValue]);

  useEffect(() => {
    const handleOutside = (event) => {
      const dateRoot = datePickerRef.current;
      const timeRoot = timePickerRef.current;
      const target = event.target;
      if (dateRoot && !dateRoot.contains(target)) setShowDatePicker(false);
      if (timeRoot && !timeRoot.contains(target)) setShowTimePicker(false);
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, []);

  useEffect(() => {
    if (!showConfirmation) return;
    setShowDatePicker(false);
    setShowTimePicker(false);
  }, [showConfirmation]);

  return (
    <div className="relative p-3 md:p-8 bg-linear-to-tl border border-slate-100 from-white via-slate-50 to-blue-50 rounded-2xl shadow-sm min-h-[760px] h-full">
      <div
        className={`transition-all duration-500 ${
          showConfirmation ? "opacity-0 translate-y-3 pointer-events-none" : "opacity-100 translate-y-0"
        }`}
      >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 mb-2">
              Full Name *
            </label>
            <input id="fullName" type="text" placeholder="Enter your full name" className={inputBaseStyle} {...register("fullName")} />
            {errors.fullName ? <p className={errorStyle}>{errors.fullName.message}</p> : null}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
              Phone Number *
            </label>
            <input id="phone" type="tel" placeholder="+92 300 1234567" className={inputBaseStyle} {...register("phone")} />
            {errors.phone ? <p className={errorStyle}>{errors.phone.message}</p> : null}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
              Email Address *
            </label>
            <input id="email" type="email" placeholder="name@example.com" className={inputBaseStyle} {...register("email")} />
            {errors.email ? <p className={errorStyle}>{errors.email.message}</p> : null}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div ref={datePickerRef} className="relative">
              <label htmlFor="preferredDate" className="block text-sm font-semibold text-slate-700 mb-2">
                Preferred Date *
              </label>
              <button
                id="preferredDate"
                type="button"
                onClick={() => {
                  setShowDatePicker((prev) => !prev);
                  setShowTimePicker(false);
                }}
                className={`${inputBaseStyle} text-left cursor-pointer`}
                aria-expanded={showDatePicker}
              >
                {toDisplayDate(preferredDateValue)}
              </button>
              <input type="hidden" {...register("preferredDate")} />
              {errors.preferredDate ? <p className={errorStyle}>{errors.preferredDate.message}</p> : null}
              <div
                className={`absolute z-30 mt-2 left-0 w-[min(24rem,calc(100vw-2.5rem))] rounded-2xl bg-white/95 backdrop-blur-xl shadow-xl p-4 origin-top transition-all duration-200 ${
                  showDatePicker ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-1 scale-95 pointer-events-none"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <button
                    type="button"
                    onClick={() => setCalendarMonth(new Date(calendarYear, calendarMonthIndex - 1, 1))}
                    className="h-9 px-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition cursor-pointer duration-300"
                  >
                    Prev
                  </button>
                  <p className="font-semibold text-slate-700">
                    {calendarMonth.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
                  </p>
                  <button
                    type="button"
                    onClick={() => setCalendarMonth(new Date(calendarYear, calendarMonthIndex + 1, 1))}
                    className="h-9 px-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition cursor-pointer duration-300"
                  >
                    Next
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1 mb-2 text-center text-xs font-medium text-slate-500">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <span key={day}>{day}</span>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {calendarCells.map((day, idx) => {
                    if (!day) return <span key={`empty-${idx}`} className="h-9" />;
                    const dateObj = new Date(calendarYear, calendarMonthIndex, day);
                    const iso = formatDateISO(dateObj);
                    const isDisabled = dateObj.getDay() === 0 || isBeforeToday(dateObj, today);
                    const isSelected = preferredDateValue === iso;
                    return (
                      <button
                        key={iso}
                        type="button"
                        disabled={isDisabled}
                        onClick={() => {
                          setValue("preferredDate", iso, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
                          setShowDatePicker(false);
                        }}
                        className={`h-9 rounded-xl text-sm transition cursor-pointer ${
                          isSelected ? "bg-blue-100 text-blue-700" : "text-slate-700 hover:bg-slate-100"
                        } ${isDisabled ? "text-slate-300 opacity-35 grayscale cursor-not-allowed hover:bg-transparent" : ""}`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div ref={timePickerRef} className="relative">
              <label htmlFor="preferredTime" className="block text-sm font-semibold text-slate-700 mb-2">
                Preferred Time *
              </label>
              <button
                id="preferredTime"
                type="button"
                onClick={() => {
                  setShowTimePicker((prev) => !prev);
                  setShowDatePicker(false);
                }}
                className={`${inputBaseStyle} text-left cursor-pointer`}
                aria-expanded={showTimePicker}
              >
                {toDisplayTime(preferredTimeValue)}
              </button>
              <input type="hidden" {...register("preferredTime")} />
              {errors.preferredTime ? <p className={errorStyle}>{errors.preferredTime.message}</p> : null}
              <div
                className={`absolute z-30 mt-2 right-0 sm:right-0 w-[min(24rem,calc(100vw-2.5rem))] rounded-2xl bg-slate-50/95 backdrop-blur-xl shadow-xl p-4 origin-top transition-all duration-200 ${
                  showTimePicker ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-1 scale-95 pointer-events-none"
                }`}
              >
                <div className="flex gap-2 md:gap-3">
                  <WheelColumn label="Hour" ariaLabel="Hour selector" items={hourItems} selectedValue={wheelTime.hour} onChange={(value) => setWheelTime((prev) => ({ ...prev, hour: value }))} />
                  <WheelColumn label="Minute" ariaLabel="Minute selector" items={minuteItems} selectedValue={wheelTime.minute} onChange={(value) => setWheelTime((prev) => ({ ...prev, minute: value }))} />
                  <WheelColumn label="Period" ariaLabel="AM PM selector" items={amPmItems} selectedValue={wheelTime.period} onChange={(value) => setWheelTime((prev) => ({ ...prev, period: value }))} />
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    const nextValue = to24HourTime(wheelTime.hour, wheelTime.minute, wheelTime.period);
                    setValue("preferredTime", nextValue, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
                    await trigger("preferredTime");
                    setShowTimePicker(false);
                  }}
                  className="fill-btn mt-4 w-full h-11 rounded-xl font-semibold cursor-pointer"
                >
                  Confirm Time
                </button>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="concern" className="block text-sm font-semibold text-slate-700 mb-2">
              Main Concern / Reason for Consultation *
            </label>
            <textarea id="concern" rows={5} placeholder="Briefly describe your concern..." className={`${inputBaseStyle} resize-none`} {...register("concern")} />
            {errors.concern ? <p className={errorStyle}>{errors.concern.message}</p> : null}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="fill-btn w-full rounded-xl text-white font-semibold px-5 py-3.5 transition cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
          >
            {isSubmitting ? "Submitting..." : "Submit Appointment Request"}
          </button>
          <p className="text-sm text-slate-500 leading-relaxed text-center">
            * Required fields. Your information is kept confidential and secure.
          </p>
        </form>
      </div>

      <div
        ref={confirmationRef}
        className={`absolute inset-3 md:inset-8 transition-all duration-500 ${
          showConfirmation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <div className="h-full min-h-[280px] rounded-2xl border border-emerald-200 bg-emerald-50 p-6 md:p-8 flex flex-col justify-center shadow-sm">
          <CheckCircle2 className="text-emerald-600 mb-4" size={34} />
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Appointment Request Submitted</h3>
          <p className="text-slate-600 mb-4">
            Thank you, {submittedData?.fullName}. Your request has been received and our team will contact you soon to confirm your slot.
          </p>
          <p className="text-sm text-slate-500">
            If your matter is urgent, please call or email us directly for faster assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
