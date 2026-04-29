import { z } from "zod";

const internationalPhoneRegex = /^\+?[1-9]\d{7,14}$/;
const pakistanPhoneRegex = /^(?:\+92|0)?3\d{9}$/;

export const appointmentSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name is required.")
    .max(40, "Full name is too long."),
  phone: z
    .string()
    .min(8, "Phone number is required.")
    .refine((value) => {
      const cleaned = value.replace(/[\s-]/g, "");
      return (
        internationalPhoneRegex.test(cleaned) || pakistanPhoneRegex.test(cleaned)
      );
    }, "Enter a valid phone number."),
  email: z.email("Enter a valid email address."),
  preferredDate: z
    .string()
    .min(1, "Preferred date is required.")
    .refine((dateValue) => {
      const date = new Date(`${dateValue}T00:00:00`);
      return date.getDay() !== 0;
    }, "Sundays are off. Please choose another date."),
  preferredTime: z
    .string()
    .min(1, "Preferred time is required.")
    .refine((timeValue) => {
      const [hour] = timeValue.split(":").map(Number);
      return hour >= 10 && hour < 21;
    }, "Time must be between 10:00 AM and 9:00 PM."),
  concern: z
    .string()
    .min(10, "Please share at least 10 characters.")
    .max(600, "Please keep your concern under 600 characters."),
});

export const notes = [
  "Ensure a stable internet connection for video consultations",
  "Bring previous medical reports or prescriptions",
  "Cancellations must be made 24 hours in advance",
];

export const hourItems = Array.from({ length: 12 }, (_, index) =>
  String(index + 1).padStart(2, "0")
);
export const minuteItems = Array.from({ length: 60 }, (_, index) =>
  String(index).padStart(2, "0")
);
export const amPmItems = ["AM", "PM"];

export const getDaysInMonth = (year, month) =>
  new Date(year, month + 1, 0).getDate();

export const formatDateISO = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const isBeforeToday = (date, today) => {
  const checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const current = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return checkDate < current;
};

export const toDisplayDate = (value) => {
  if (!value) return "Select date";
  const [year, month, day] = value.split("-").map(Number);
  const parsed = new Date(year, month - 1, day);
  return parsed.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const toDisplayTime = (value) => {
  if (!value) return "Select time";
  const [hour24, minute] = value.split(":").map(Number);
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${String(hour12).padStart(2, "0")}:${String(minute).padStart(2, "0")} ${period}`;
};

export const to24HourTime = (hour12, minute, period) => {
  let hour = Number(hour12);
  if (period === "AM" && hour === 12) hour = 0;
  if (period === "PM" && hour !== 12) hour += 12;
  return `${String(hour).padStart(2, "0")}:${String(Number(minute)).padStart(2, "0")}`;
};

export const from24HourTime = (time) => {
  if (!time || !time.includes(":")) return { hour: "10", minute: "00", period: "AM" };
  const [hour24, minute] = time.split(":").map(Number);
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return {
    hour: String(hour12).padStart(2, "0"),
    minute: String(minute).padStart(2, "0"),
    period,
  };
};
