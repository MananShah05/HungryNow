import { Star } from '@phosphor-icons/react';

interface RatingBadgeProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md';
}

export default function RatingBadge({ rating, reviewCount, size = 'sm' }: RatingBadgeProps) {
  const isGood = rating >= 4.0;
  const bgColor = isGood ? 'bg-green-600' : rating >= 3.5 ? 'bg-yellow-500' : 'bg-red-500';

  if (size === 'md') {
    return (
      <div className="flex items-center gap-1.5">
        <div className={`flex items-center gap-1 ${bgColor} text-white px-2 py-0.5 rounded-md`}>
          <Star weight="fill" size={12} />
          <span className="text-sm font-semibold">{rating.toFixed(1)}</span>
        </div>
        {reviewCount && (
          <span className="text-sm text-zinc-500">({reviewCount.toLocaleString()})</span>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-0.5 ${bgColor} text-white px-1.5 py-0.5 rounded text-xs font-semibold`}>
      <Star weight="fill" size={10} />
      <span>{rating.toFixed(1)}</span>
    </div>
  );
}
