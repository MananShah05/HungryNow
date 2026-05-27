export function SkeletonCard() {
  return (
    <div className="bg-white rounded-[1.25rem] overflow-hidden shadow-card">
      <div className="shimmer w-full h-44" />
      <div className="p-4 space-y-3">
        <div className="shimmer h-5 w-3/4 rounded-lg" />
        <div className="shimmer h-4 w-1/2 rounded-lg" />
        <div className="shimmer h-4 w-full rounded-lg" />
        <div className="flex gap-2">
          <div className="shimmer h-6 w-16 rounded-full" />
          <div className="shimmer h-6 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonMenuItem() {
  return (
    <div className="flex gap-4 p-4 border-b border-zinc-100 last:border-0">
      <div className="flex-1 space-y-2">
        <div className="shimmer h-4 w-3/4 rounded" />
        <div className="shimmer h-3 w-full rounded" />
        <div className="shimmer h-3 w-2/3 rounded" />
        <div className="shimmer h-5 w-20 rounded" />
      </div>
      <div className="shimmer w-24 h-24 rounded-xl flex-shrink-0" />
    </div>
  );
}

export function SkeletonHeroCard() {
  return (
    <div className="bg-white rounded-[2rem] overflow-hidden shadow-card">
      <div className="shimmer w-full h-32" />
      <div className="p-3 space-y-2">
        <div className="shimmer h-4 w-2/3 rounded" />
        <div className="shimmer h-3 w-1/2 rounded" />
      </div>
    </div>
  );
}
