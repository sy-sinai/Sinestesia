import { FaStar } from 'react-icons/fa';

export default function RatingStars({ rating, setRating }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          className={`text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
        >
          <FaStar />
        </button>
      ))}
    </div>
  );
}