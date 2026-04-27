import { Star } from "lucide-react";
const ReviewCard = ({ data }) => {
  return (
    <div className="relative h-full flex flex-col">
      {/* Card */}
      <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col flex-1 justify-between">
        {/* Text */}
        <p className="text-slate-600 text-sm leading-relaxed mb-5">
          {data.text}
        </p>

        <div>
          <h3 className="text-sm font-semibold text-blue-500">
            {data.disease}
          </h3>

          {/* Stars */}
          <div className="flex gap-1 text-yellow-500 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>
                {i < data.rating ? <Star className="fill-yellow-400 text-yellow-400 w-4" /> : <Star className="opacity-50 fill-yellow-400 text-yellow-400 w-4" />}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3 mt-6">
        <img
          src={data.image}
          alt={data.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold text-slate-800">{data.name}</p>
          <p className="text-xs text-slate-400">{data.time}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
