import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

export default function Rating({ value, reviewsCount, size = 'sm' }) {
  const stars = [];
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.5;
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';

  for (let i = 0; i < 5; i += 1) {
    if (i < full) stars.push(<FaStar key={i} className="text-amber-400" />);
    else if (i === full && hasHalf) stars.push(<FaStarHalfAlt key={i} className="text-amber-400" />);
    else stars.push(<FaRegStar key={i} className="text-amber-300" />);
  }

  return (
    <div className={`flex items-center gap-1 ${textSize}`}>
      <span className="flex">{stars}</span>
      <span className="font-semibold text-ink">{value}</span>
      {reviewsCount != null && <span className="text-muted">({reviewsCount.toLocaleString('en-IN')})</span>}
    </div>
  );
}
