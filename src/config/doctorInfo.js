// All personal data is loaded from .env file.
// For deployment, add these variables in Vercel dashboard under

const doctorInfo = {
  name: import.meta.env.VITE_DOCTOR_NAME,
  email: import.meta.env.VITE_DOCTOR_EMAIL,
  phone: import.meta.env.VITE_DOCTOR_PHONE,
};

export default doctorInfo;
