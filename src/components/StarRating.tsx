
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
}

export const StarRating = ({ rating, onChange, readonly = true, size = "md" }: StarRatingProps) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClasses[size]} ${
            star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
          } ${!readonly ? "cursor-pointer hover:text-yellow-400" : ""}`}
          onClick={!readonly ? () => onChange?.(star) : undefined}
        />
      ))}
    </div>
  );
};
