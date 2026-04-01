
import { FaStar, FaRegStar } from 'react-icons/fa';

 function StarRating({ rating }) {
  const totalStars = 5;
  
  return (
    <p className="flex items-center">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span key={index}>
            {rating >= starValue ? (
              <FaStar className="text-yellow-400 w-5 h-5 m-1" />
            ) : (
              <FaRegStar className="text-gray-300 w-5 h-5 m-1" />
            )}
          </span>
        );
      })}
    </p>
  );
}

export default StarRating;