interface VegDotProps {
  isVeg: boolean;
  size?: number;
}

export default function VegDot({ isVeg, size = 8 }: VegDotProps) {
  const color = isVeg ? '#22c55e' : '#ef4444';
  const borderColor = isVeg ? '#16a34a' : '#dc2626';

  return (
    <svg
      width={size + 4}
      height={size + 4}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={isVeg ? 'Vegetarian' : 'Non-vegetarian'}
    >
      <rect x="1" y="1" width="10" height="10" rx="2" stroke={borderColor} strokeWidth="1.5" />
      <circle cx="6" cy="6" r="3" fill={color} />
    </svg>
  );
}
